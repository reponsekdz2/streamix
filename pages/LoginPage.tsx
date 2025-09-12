
import React, { useState } from 'react';
// FIX: Corrected import path for AuthContext.
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { MOCK_USER } from '../constants';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // In a real app, you'd validate credentials against a backend.
    // Here, we just call login with the mock user.
    console.log('Logging in with', { email, password });
    login(MOCK_USER);
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/register"
    >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-netflix-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;