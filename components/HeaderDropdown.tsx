
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// FIX: Corrected import path for AuthContext.
import { useAuth } from '../contexts/AuthContext';
// FIX: Corrected import path for constants.
import { CogIcon, LogoutIcon, VideoCameraIcon } from '../constants';

interface HeaderDropdownProps {
  closeDropdown: () => void;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ closeDropdown }) => {
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  if (!user) return null;

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-3 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg py-2">
      <div className="px-4 py-3 border-b border-zinc-700">
        <div className="flex items-center gap-3">
            <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full" />
            <div>
                <p className="font-semibold text-white text-sm">{user.name}</p>
                <p className="text-zinc-400 text-xs">@{user.username}</p>
            </div>
        </div>
      </div>
      <div className="py-1">
        <Link to={`/profile/${user.username}`} onClick={closeDropdown} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700">
            <VideoCameraIcon className="w-5 h-5 text-zinc-400"/> Your Channel
        </Link>
        <Link to="/settings" onClick={closeDropdown} className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700">
            <CogIcon className="w-5 h-5 text-zinc-400"/> Settings
        </Link>
      </div>
      <div className="border-t border-zinc-700 py-1">
        <button onClick={() => { logout(); closeDropdown(); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700">
            <LogoutIcon className="w-5 h-5 text-zinc-400"/> Sign Out
        </button>
      </div>
    </div>
  );
};

export default HeaderDropdown;