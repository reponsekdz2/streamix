
import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_USER } from '../constants';

const RegisterPage: React.FC = () => {
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate registration and login
        login(MOCK_USER);
    };

    return (
        <AuthLayout title="Create Account">
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300">Full Name</label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email address</label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
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
                            autoComplete="new-password"
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-netflix-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-netflix-red"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-zinc-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
                    Sign In
                </Link>
            </p>
        </AuthLayout>
    );
};

export default RegisterPage;
