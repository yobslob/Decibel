import React, { useState, useEffect, useRef } from 'react';
import { Heart, Search as SearchIcon, X } from 'lucide-react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;

const ExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const searchDebounceRef = useRef(null);

    // Search handler with debug logs
    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setSearchLoading(true);
            setSearchError(null);

            console.log("Making search request for:", query); // Debug log

            const response = await axios.get(`/api/dashboard/users/search`, {
                params: { q: query },
                withCredentials: true,
            });

            console.log("Search response:", response.data); // Debug log
            setSearchResults(response.data);
        } catch (error) {
            console.error("Search error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            setSearchError(error.response?.data?.error || 'Search failed');
            setSearchResults([]);
        } finally {
            setSearchLoading(false);
        }
    };

    // Debounced search effect
    useEffect(() => {
        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current);
        }

        searchDebounceRef.current = setTimeout(() => {
            handleSearch(searchQuery);
        }, 300);

        return () => {
            if (searchDebounceRef.current) {
                clearTimeout(searchDebounceRef.current);
            }
        };
    }, [searchQuery]);

    return (
        <div className="w-full">
            <div className="max-w-2xl mx-auto p-4">
                <div className="relative">
                    {/* Search Input */}
                    <div className="flex items-center border rounded-lg px-4 py-2">
                        <SearchIcon size={20} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full ml-2 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <X
                                size={20}
                                className="text-gray-400 cursor-pointer"
                                onClick={() => setSearchQuery('')}
                            />
                        )}
                    </div>

                    {/* Error Message */}
                    {searchError && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                            {searchError}
                        </div>
                    )}

                    {/* Search Results */}
                    {searchQuery && (
                        <div className="mt-4">
                            {searchLoading ? (
                                <div className="p-4 text-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="border rounded-lg overflow-hidden">
                                    {searchResults.map((user) => (
                                        <div
                                            key={user._id}
                                            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                            onClick={() => window.location.href = `/profile/${user._id}`}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                                                style={{ backgroundColor: user.currentAura || '#A0A0A0' }}
                                            >
                                                {user.profilePic ? (
                                                    <img
                                                        src={user.profilePic}
                                                        alt={user.username}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span>{user.username[0].toUpperCase()}</span>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <div className="font-semibold">{user.username}</div>
                                                {(user.firstName || user.lastName) && (
                                                    <div className="text-sm text-gray-500">
                                                        {`${user.firstName || ''} ${user.lastName || ''}`}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                                    No users found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;