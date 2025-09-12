
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon, BellIcon } from '../constants';
import { AppContext } from '../App';
import { useAuth } from '../contexts/AuthContext';
import HeaderDropdown from './HeaderDropdown';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const { user, isLoggedIn } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-netflix-dark bg-opacity-90 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 py-2 border-b border-zinc-800 h-16">
      <div className="flex items-center gap-4">
        <button onClick={appContext?.toggleSidebar} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
          <MenuIcon className="h-6 w-6 text-zinc-400" />
        </button>
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-netflix-red tracking-wider">STREAMIX</h1>
        </Link>
      </div>

      <div className="flex-1 flex justify-center px-4 lg:px-16">
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-2 pl-4 pr-12 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all"
            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-zinc-400 hover:text-white">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn && user ? (
          <>
            <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
              <BellIcon className="h-6 w-6 text-zinc-400" />
            </button>
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-9 w-9 rounded-full cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-offset-2 hover:ring-offset-netflix-dark hover:ring-netflix-red"
              />
              {isDropdownOpen && <HeaderDropdown closeDropdown={() => setIsDropdownOpen(false)} />}
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-netflix-red text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
