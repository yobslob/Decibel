import React from 'react';
import {
    Home,
    Search,
    Compass,
    Store,
    Bell,
    PlusSquare,
    User,
    Menu
} from 'lucide-react';

const LeftSidebar = () => {
    const menuItems = [
        { icon: <Home size={24} />, label: 'Home' },
        { icon: <Search size={24} />, label: 'Search' },
        { icon: <Compass size={24} />, label: 'Explore' },
        { icon: <Store size={24} />, label: 'Store' },
        { icon: <Bell size={24} />, label: 'Notifications' },
        { icon: <PlusSquare size={24} />, label: 'Create' },
        { icon: <User size={24} />, label: 'Profile' },
        { icon: <Menu size={24} />, label: 'More' }
    ];

    return (
        <div className="w-64 h-screen border-r border-gray-200 fixed left-0 bg-white p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">Decibel</h1>
            </div>
            <nav>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer mb-2"
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default LeftSidebar;