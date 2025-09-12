
import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_USER } from '../constants';

const LoginPage: React.FC = () => {
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd get form data and validate it
        login(MOCK_USER);
    };

    return (
        <AuthLayout title="Sign In">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email address</label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            defaultValue="alex.wilton@example.com"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Password</label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            defaultValue="password123"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-netflix-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-netflix-red"
                    >
                        Sign In
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-zinc-400">
                Not a member?{' '}
                <Link to="/register" className="font-medium text-red-500 hover:text-red-400">
                    Sign up now
                </Link>
            </p>
        </AuthLayout>
    );
};

export default LoginPage;
