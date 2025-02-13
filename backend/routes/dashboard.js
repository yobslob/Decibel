// routes/dashboardRoutes.js
import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import Post from "../models/post.js";
import User from "../models/user.js";

const router = express.Router();

// Get dashboard feed data
router.get("/feed", protectRoute, async (req, res) => {
    try {
        // Get posts from user and followed users
        const userId = req.user._id;
        const user = await User.findById(userId);

        const posts = await Post.find({
            user: { $in: [...user.connection, userId] }
        })
            .populate("user", "username profilePic")
            .sort({ createdAt: -1 })
            .limit(10);

        // Get suggested users (not followed by current user)
        const suggestedUsers = await User.find({
            _id: {
                $nin: [...user.connection, userId]
            }
        })
            .select("username profilePic")
            .limit(5);

        res.status(200).json({
            posts,
            suggestedUsers
        });
    } catch (error) {
        console.error("Error in dashboard feed: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Create new post
router.post("/posts", protectRoute, async (req, res) => {
    try {
        const { caption, image } = req.body;
        const newPost = new Post({
            user: req.user._id,
            caption,
            image
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error in create post: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get explore page posts (all posts sorted by likes)
router.get("/posts/explore", protectRoute, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username profilePic")
            .sort({ likes: -1 })
            .limit(30); // Limiting to 30 posts initially for performance

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error in explore feed: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Search users
router.get("/users/search", protectRoute, async (req, res) => {
    try {
        const { q } = req.query;

        console.log("Search query received:", q); // Debug log
        console.log("User making request:", req.user._id); // Debug log

        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const users = await User.find({
            $or: [
                { username: { $regex: q, $options: 'i' } },
                { firstName: { $regex: q, $options: 'i' } },
                { lastName: { $regex: q, $options: 'i' } }
            ]
        })
            .select('username firstName lastName profilePic currentAura')
            .limit(10);

        console.log("Search results:", users.length); // Debug log
        res.json(users);
    } catch (error) {
        console.error("Search error details:", {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ error: "Server error in search" });
    }
});

// Like/Unlike post
router.put("/posts/:id/like", protectRoute, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isLiked = post.likes.includes(req.user._id);

        if (isLiked) {
            // Unlike
            await Post.updateOne(
                { _id: req.params.id },
                { $pull: { likes: req.user._id } }
            );
            res.status(200).json({ message: "Post unliked" });
        } else {
            // Like
            await Post.updateOne(
                { _id: req.params.id },
                { $push: { likes: req.user._id } }
            );
            res.status(200).json({ message: "Post liked" });
        }
    } catch (error) {
        console.error("Error in like/unlike post: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Follow/Unfollow user
router.put("/users/:id/follow", protectRoute, async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = req.user;

        if (!userToFollow) {
            return res.status(404).json({ error: "User not found" });
        }

        if (currentUser._id.toString() === req.params.id) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        const isFollowing = currentUser.following.includes(req.params.id);

        if (isFollowing) {
            // Unfollow
            await User.findByIdAndUpdate(currentUser._id, {
                $pull: { following: req.params.id }
            });
            await User.findByIdAndUpdate(req.params.id, {
                $pull: { followers: currentUser._id }
            });
            res.status(200).json({ message: "User unfollowed" });
        } else {
            // Follow
            await User.findByIdAndUpdate(currentUser._id, {
                $push: { following: req.params.id }
            });
            await User.findByIdAndUpdate(req.params.id, {
                $push: { followers: currentUser._id }
            });
            res.status(200).json({ message: "User followed" });
        }
    } catch (error) {
        console.error("Error in follow/unfollow: ", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;