
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, FireIcon, CollectionIcon, HistoryIcon, VideoCameraIcon, ClockIcon, DownloadIcon, StarIcon, CogIcon, DollarSignIcon } from '../constants';
import { AppContext } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isSidebarOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isSidebarOpen }) => {
  const baseClasses = "flex items-center p-3 rounded-lg hover:bg-zinc-800 transition-colors w-full";
  const activeClasses = "bg-zinc-700 text-white";
  const inactiveClasses = "text-zinc-400 hover:text-white";

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className="h-6 w-6" />
      <span className={`ml-4 text-sm font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 whitespace-nowrap'}`}>
        {label}
      </span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);
  const { user } = useAuth();
  const isSidebarOpen = context?.isSidebarOpen ?? true;

  return (
    <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-black z-40 transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-20'} overflow-y-auto`}>
      <div className="flex flex-col p-3 space-y-1">
        <NavItem to="/" icon={HomeIcon} label="Home" isSidebarOpen={isSidebarOpen} />
        <NavItem to="/trending" icon={FireIcon} label="Trending" isSidebarOpen={isSidebarOpen} />
        <NavItem to="/subscriptions" icon={CollectionIcon} label="Subscriptions" isSidebarOpen={isSidebarOpen} />
        
        <div className="border-t border-zinc-800 my-2 mx-3"></div>

        <h3 className={`px-3 text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>You</h3>
        <NavItem to={user ? `/profile/${user.username}` : '/login'} icon={VideoCameraIcon} label="Your Channel" isSidebarOpen={isSidebarOpen} />
        <NavItem to="/history" icon={HistoryIcon} label="History" isSidebarOpen={isSidebarOpen} />
        <NavItem to="/downloads" icon={DownloadIcon} label="Downloads" isSidebarOpen={isSidebarOpen} />
        <NavItem to="/watch-later" icon={ClockIcon} label="Watch Later" isSidebarOpen={isSidebarOpen} />
        
        <div className="border-t border-zinc-800 my-2 mx-3"></div>

        <h3 className={`px-3 text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Creator Studio</h3>
        <NavItem to="/monetization" icon={DollarSignIcon} label="Monetization" isSidebarOpen={isSidebarOpen} />

        <div className="border-t border-zinc-800 my-2 mx-3"></div>

        <h3 className={`px-3 text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>More from Streamix</h3>
        <NavItem to="/premium" icon={StarIcon} label="Streamix Premium" isSidebarOpen={isSidebarOpen} />
        <NavItem to="/settings" icon={CogIcon} label="Settings" isSidebarOpen={isSidebarOpen} />

      </div>
    </aside>
  );
};

export default Sidebar;
