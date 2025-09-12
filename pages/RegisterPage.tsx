
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for AuthContext.
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import { MOCK_USER } from '../constants';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { login } = useAuth();

    useEffect(() => {
        let strength = 0;
        if (password.length > 5) strength++;
        if (password.length > 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(Math.min(strength, 4));
    }, [password]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !username || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (passwordStrength < 2) {
            setError("Password is too weak. Please choose a stronger password.");
            return;
        }
        
        console.log('Registering with', { email, username, password });
        // In a real app, this would be an API call to register the user.
        // After successful registration, we log the user in.
        login({ ...MOCK_USER, email, username, name: username });
    };

    return (
        <AuthLayout
            title="Create a new account"
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerLinkTo="/login"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                 {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-zinc-300">Username</label>
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>
                 <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>
                <div>
                   <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Password</label>
                   <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                   />
                   {password.length > 0 && <PasswordStrengthIndicator strength={passwordStrength} />}
                </div>
                 <div>
                   <label htmlFor="confirm-password" className="block text-sm font-medium text-zinc-300">Confirm Password</label>
                   <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                   />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-netflix-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
                  >
                    Create Account
                  </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;