import React from 'react';

const RightSidebar = ({ suggestedUsers, onFollowUser, currentUser }) => {
    return (
        <div className="w-80 h-screen fixed right-0 bg-white p-4 border-l border-gray-200 overflow-y-auto">
            {/* User Profile */}
            <div className="flex items-center mb-6">
                <img
                    src={currentUser?.profilePic || "/api/placeholder/56/56"}
                    alt={currentUser?.username || "Profile"}
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div className="ml-4">
                    <h2 className="font-medium">{currentUser?.username || "username"}</h2>
                    <p className="text-gray-500">{currentUser?.fullName || "Full Name"}</p>
                </div>
            </div>

            {/* Suggested Friends */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Suggestions For You</span>
                    <button className="text-sm font-semibold text-gray-900 hover:text-gray-700">
                        See All
                    </button>
                </div>
                {suggestedUsers?.map((user) => (
                    <div key={user._id} className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            <img
                                src={user.profilePic || "/api/placeholder/32/32"}
                                alt={user.username}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="ml-3">
                                <p className="font-medium text-sm">{user.username}</p>
                                {user.followers && (
                                    <p className="text-xs text-gray-500">
                                        {user.followers.length} followers
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => onFollowUser(user._id)}
                            className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors"
                        >
                            Follow
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-400">
                <nav className="flex flex-wrap gap-2 mb-3">
                    <a href="#" className="hover:underline hover:text-gray-500 transition-colors">About</a>
                    <a href="#" className="hover:underline hover:text-gray-500 transition-colors">Help</a>
                    <a href="#" className="hover:underline hover:text-gray-500 transition-colors">Press</a>
                    <a href="#" className="hover:underline hover:text-gray-500 transition-colors">API</a>
                    <a href="#" className="hover:underline hover:text-gray-500 transition-colors">Jobs</a>
                    <a href="#" className="hover:underline hover:text-gray-500 transition-colors">Privacy</a>
                    <a href="#" className="hover:underline hover:text-gray-500 transition-colors">Terms</a>
                </nav>
                <p className="text-center mt-4">© {new Date().getFullYear()} Decibel</p>
            </div>
        </div>
    );
};

export default RightSidebar;