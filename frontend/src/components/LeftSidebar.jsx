import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        { icon: <Home size={24} />, label: 'Home', path: '/' },
        { icon: <Search size={24} />, label: 'Search', path: '/search' },
        { icon: <Compass size={24} />, label: 'Explore', path: '/explore' },
        { icon: <Store size={24} />, label: 'Store', path: '/store' },
        { icon: <Bell size={24} />, label: 'Notifications', path: '/notifications' },
        { icon: <PlusSquare size={24} />, label: 'Create', path: '/create' },
        { icon: <User size={24} />, label: 'Profile', path: '/profile' },
        { icon: <Menu size={24} />, label: 'More', path: '/more' }
    ];

    // Navigate to home by default if on root path
    React.useEffect(() => {
        if (currentPath === '/') {
            navigate('/');
        }
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="w-64 h-screen border-r border-gray-200 fixed left-0 bg-white p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">Decibel</h1>
            </div>
            <nav>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer mb-2 
                            ${currentPath === item.path
                                ? 'bg-gray-100 text-blue-600'
                                : 'hover:bg-gray-100'}`}
                        onClick={() => handleNavigation(item.path)}
                    >
                        {React.cloneElement(item.icon, {
                            className: currentPath === item.path ? 'text-blue-600' : ''
                        })}
                        <span className="font-medium">{item.label}</span>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default LeftSidebar;