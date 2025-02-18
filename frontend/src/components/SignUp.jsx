import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { authAPI } from '../services/authService.js';
import { useAuth } from '../services/authContext.jsx';

const SignUp = ({ onToggle }) => {
    const { setUser, setLoading, setError } = useAuth();
    const [usernameError, setUsernameError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        firstName: '', // Added this
        lastName: '',  // Added this
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        // Create a new object with the backend-expected format
        const signupData = {
            ...formData,
            // Remove fullName as it's not needed for backend
            fullName: formData.firstName + " " + formData.lastName
        };

        try {
            const response = await authAPI.signup(signupData);
            setUser(response.user);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message || 'Something went wrong during signup');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'username') {
            setUsernameError('');
            if (value.length < 3) {
                setUsernameError('Username must be at least 3 characters long');
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                setUsernameError('Username can only contain letters, numbers, and underscores');
            }
        }

        // Special handling for fullName
        if (name === 'fullName') {
            const names = value.trim().split(' ');
            const firstName = names[0] || '';
            // Join the rest of the names as lastName
            const lastName = names.slice(1).join(' ') || '';

            setFormData(prev => ({
                ...prev,
                fullName: value,
                firstName,
                lastName
            }));
        } else {
            // Handle other form fields normally
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="#" onClick={onToggle} className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <div className="relative">
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    {/* Username Input */}
                    <div className="relative">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${usernameError ? 'border-red-300' : 'border-gray-300'
                                    } rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 ${usernameError ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'
                                    } sm:text-sm`}
                                placeholder="johnnotfound"
                                minLength="3"
                                maxLength="30"
                                pattern="[a-zA-Z0-9_]+"
                                required
                            />
                        </div>
                        {usernameError && (
                            <p className="mt-1 text-sm text-red-600">
                                {usernameError}
                            </p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            I agree to the{' '}
                            <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                {/* Social Sign Up */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            Google
                        </button>
                        <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;