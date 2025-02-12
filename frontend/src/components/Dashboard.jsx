import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LeftSidebar from './leftSidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/api/dashboard/feed");
                setPosts(data.posts);
                setSuggestedUsers(data.suggestedUsers);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError(error.message);
                if (error.response?.status === 401) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    // Handler for liking/unliking posts
    const handleLikePost = async (postId) => {
        try {
            await axios.put(`/api/dashboard/posts/${postId}/like`);
            // Refresh posts after like/unlike
            const { data } = await axios.get("/api/dashboard/feed");
            setPosts(data.posts);
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    // Handler for following/unfollowing users
    const handleFollowUser = async (userId) => {
        try {
            await axios.put(`/api/dashboard/users/${userId}/follow`);
            // Refresh suggested users after follow/unfollow
            const { data } = await axios.get("/api/dashboard/feed");
            setSuggestedUsers(data.suggestedUsers);
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <LeftSidebar />
            <MainContent
                posts={posts}
                onLikePost={handleLikePost}
            />
            <RightSidebar
                suggestedUsers={suggestedUsers}
                onFollowUser={handleFollowUser}
            />
        </div>
    );
};

export default Dashboard;