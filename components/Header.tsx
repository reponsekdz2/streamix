
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// FIX: Corrected import paths.
import { MenuIcon, SearchIcon, BellIcon, VideoCameraIcon } from '../constants';
import { AppContext } from '../App';
import { useAuth } from '../contexts/AuthContext';
import HeaderDropdown from './HeaderDropdown';
import NotificationsDropdown from './NotificationsDropdown';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  
  const context = useContext(AppContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleProfileDropdown = () => {
      setProfileDropdownOpen(prev => !prev);
      setNotificationsDropdownOpen(false);
  };

  const toggleNotificationsDropdown = () => {
      setNotificationsDropdownOpen(prev => !prev);
      setProfileDropdownOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black z-50 flex items-center justify-between px-6 border-b border-zinc-800">
      <div className="flex items-center">
        <button onClick={context?.toggleSidebar} className="p-2 rounded-full hover:bg-zinc-800 mr-4">
          <MenuIcon className="h-6 w-6 text-white" />
        </button>
        <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-netflix-red tracking-wider">STREAMIX</h1>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-l-full py-2 px-6 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
          <button type="submit" className="bg-zinc-800 border-y border-r border-zinc-700 rounded-r-full px-6 py-2 hover:bg-zinc-700">
            <SearchIcon className="h-6 w-6 text-zinc-400" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/upload" className="p-2 rounded-full hover:bg-zinc-800">
                <VideoCameraIcon className="h-6 w-6 text-white" />
            </Link>
            <div className="relative">
                <button onClick={toggleNotificationsDropdown} className="p-2 rounded-full hover:bg-zinc-800 relative">
                    <BellIcon className="h-6 w-6 text-white" />
                    <span className="absolute top-1 right-1.5 block h-2 w-2 rounded-full bg-netflix-red ring-2 ring-black"></span>
                </button>
                {isNotificationsDropdownOpen && <NotificationsDropdown closeDropdown={() => setNotificationsDropdownOpen(false)} />}
            </div>
            <div className="relative">
                <button onClick={toggleProfileDropdown}>
                    <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full" />
                </button>
                {isProfileDropdownOpen && <HeaderDropdown closeDropdown={() => setProfileDropdownOpen(false)} />}
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-netflix-red hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md">
                Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;