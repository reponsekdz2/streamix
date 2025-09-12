
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-netflix-dark flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <Link to="/">
                <h1 className="text-4xl font-bold text-netflix-red tracking-wider">STREAMIX</h1>
            </Link>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-6">{title}</h2>
            {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
