import React, { useState, useEffect } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLogin, setIsLogin] = useState(true);

    const images = [
        pic1,
        pic2,
        pic3,
        pic4
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-gray-50 flex flex-col">
            {/* Main Content with Integrated Header */}
            <div className="w-full h-full flex flex-col">
                {/* Header Section - Now part of main content */}
                <div className="px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600">Decibel.</h1>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200">
                        Get App
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                        {/* iPhone Display */}
                        <div className="relative">
                            {/* iPhone Frame */}
                            <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] p-4 shadow-xl">
                                {/* iPhone Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

                                {/* Screen Content */}
                                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                                    {/* Animated Images */}
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`App Screenshot ${index + 1}`}
                                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Auth Component */}
                        <div className="w-full max-w-md">
                            {isLogin ? (
                                <Login onToggle={toggleForm} />
                            ) : (
                                <SignUp onToggle={toggleForm} setIsLogin={setIsLogin} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;