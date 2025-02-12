import React from 'react';

const MainContent = ({ posts, onLikePost }) => {
    // Keep mock data only for stories since they're not yet implemented in backend
    const stories = Array(8).fill(null).map((_, i) => ({
        id: i,
        username: `user${i}`,
        imageUrl: `/api/placeholder/40/40`
    }));

    return (
        <div className="ml-64 mr-80 min-h-screen bg-gray-50">
            {/* Stories */}
            <div className="flex space-x-4 p-4 bg-white border-b border-gray-200 overflow-x-auto">
                {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full ring-2 ring-pink-500 p-0.5">
                            <img
                                src={story.imageUrl}
                                alt={story.username}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <span className="text-xs mt-1">{story.username}</span>
                    </div>
                ))}
            </div>

            {/* Posts */}
            <div className="max-w-xl mx-auto py-4">
                {posts?.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-sm mb-6">
                        <div className="p-4 flex items-center">
                            <img
                                src={post.user?.profilePic || "/api/placeholder/32/32"}
                                alt={post.user?.username}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="ml-3 font-medium">{post.user?.username}</span>
                        </div>
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <div className="flex space-x-4 mb-2">
                                <button
                                    onClick={() => onLikePost(post._id)}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 ${post.likes?.includes(post.user?._id) ? 'text-red-500 fill-current' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    <span>{post.likes?.length || 0} likes</span>
                                </button>
                                <button className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 cursor-pointer"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    <span>{post.comments?.length || 0} comments</span>
                                </button>
                            </div>
                            <p className="mt-2">
                                <span className="font-medium">{post.user?.username}</span>{' '}
                                {post.caption}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainContent;