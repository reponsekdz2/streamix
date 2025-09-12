import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, footerText, footerLinkText, footerLinkTo }) => {
  return (
    <div className="min-h-screen bg-netflix-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto p-8 bg-black rounded-lg shadow-lg border border-zinc-800">
        <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center">
                <h1 className="text-4xl font-bold text-netflix-red tracking-wider">STREAMIX</h1>
            </Link>
          <h2 className="mt-6 text-2xl font-bold text-white">{title}</h2>
        </div>
        {children}
        <p className="mt-8 text-center text-sm text-zinc-400">
          {footerText}{' '}
          <Link to={footerLinkTo} className="font-medium text-netflix-red hover:text-red-500">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
