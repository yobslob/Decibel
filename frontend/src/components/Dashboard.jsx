import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

axios.defaults.withCredentials = true; // Enable credentials for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';

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
                const response = await axios.get("/api/dashboard/feed", {
                    withCredentials: true
                });

                console.log("Dashboard data:", response.data);
                setPosts(response.data.posts);
                setSuggestedUsers(response.data.suggestedUsers);
            } catch (error) {
                console.error("Dashboard fetch error:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });

                if (error.response?.status === 401) {
                    navigate("/");
                    return;
                }

                setError(error.response?.data?.error || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLikePost = async (postId) => {
        try {
            await axios.put(`/api/dashboard/posts/${postId}/like`, {}, {
                withCredentials: true
            });

            // Refresh only the posts data
            const response = await axios.get("/api/dashboard/feed", {
                withCredentials: true
            });
            setPosts(response.data.posts);
        } catch (error) {
            console.error("Like post error:", {
                message: error.message,
                response: error.response?.data
            });

            if (error.response?.status === 401) {
                navigate("/");
                return;
            }
        }
    };

    const handleFollowUser = async (userId) => {
        try {
            await axios.put(`/api/dashboard/users/${userId}/follow`, {}, {
                withCredentials: true
            });

            // Refresh only suggested users
            const response = await axios.get("/api/dashboard/feed", {
                withCredentials: true
            });
            setSuggestedUsers(response.data.suggestedUsers);
        } catch (error) {
            console.error("Follow user error:", {
                message: error.message,
                response: error.response?.data
            });

            if (error.response?.status === 401) {
                navigate("/");
                return;
            }
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 max-w-2xl mx-auto py-8">
            <div className="space-y-6">
                {posts.map(post => (
                    <div key={post._id} className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center mb-4">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                                style={{ backgroundColor: post.user.currentAura || '#A0A0A0' }}
                            >
                                {post.user.profilePic ? (
                                    <img
                                        src={post.user.profilePic}
                                        alt={post.user.username}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span>{post.user.username[0].toUpperCase()}</span>
                                )}
                            </div>
                            <div className="ml-3">
                                <div className="font-semibold">{post.user.username}</div>
                            </div>
                        </div>
                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.caption}
                                className="w-full h-auto rounded-lg mb-4"
                            />
                        )}
                        <p className="text-gray-800">{post.caption}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => handleLikePost(post._id)}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                {post.likes?.includes(post.user._id) ? 'Unlike' : 'Like'} ({post.likes?.length || 0})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;