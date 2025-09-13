
import React, { useState } from 'react';
// FIX: Corrected import path for AuthContext.
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Spinner from '../components/Spinner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('jane.doe@example.com'); // Pre-fill for convenience
  const [password, setPassword] = useState('password123'); // Pre-fill for convenience
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-netflix-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 disabled:bg-red-900 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Spinner /> : 'Sign in'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
