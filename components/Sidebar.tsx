
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../App';
// FIX: Added CogIcon to imports
import { FireIcon, CollectionIcon, HistoryIcon, ClockIcon, DownloadIcon, FilmIcon, VideoCameraIcon, CogIcon } from '../constants';
import { useAuth } from '../contexts/AuthContext';

// A simple HomeIcon for the sidebar
const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);


const Sidebar: React.FC = () => {
    const context = useContext(AppContext);
    const { user } = useAuth();

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors ${isActive ? 'bg-zinc-800 font-semibold' : 'text-zinc-400'}`;

    return (
        <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-black border-r border-zinc-800 z-40 transition-all duration-300 ${context?.isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <nav className="p-4 space-y-2">
                <NavLink to="/" className={navLinkClasses}>
                    <HomeIcon className="h-6 w-6" />
                    {context?.isSidebarOpen && <span>Home</span>}
                </NavLink>
                 <NavLink to="/shorts" className={navLinkClasses}>
                    <FilmIcon className="h-6 w-6" />
                    {context?.isSidebarOpen && <span>Shorts</span>}
                </NavLink>
                <NavLink to="/trending" className={navLinkClasses}>
                    <FireIcon className="h-6 w-6" />
                    {context?.isSidebarOpen && <span>Trending</span>}
                </NavLink>
                 <NavLink to="/live" className={navLinkClasses}>
                    <VideoCameraIcon className="h-6 w-6" />
                    {context?.isSidebarOpen && <span>Live</span>}
                </NavLink>
                <NavLink to="/subscriptions" className={navLinkClasses}>
                    <CollectionIcon className="h-6 w-6" />
                    {context?.isSidebarOpen && <span>Subscriptions</span>}
                </NavLink>

                {user && (
                    <>
                        <div className="border-t border-zinc-800 my-4"></div>
                        <NavLink to="/history" className={navLinkClasses}>
                            <HistoryIcon className="h-6 w-6" />
                            {context?.isSidebarOpen && <span>History</span>}
                        </NavLink>
                        <NavLink to="/watch-later" className={navLinkClasses}>
                            <ClockIcon className="h-6 w-6" />
                            {context?.isSidebarOpen && <span>Watch Later</span>}
                        </NavLink>
                         <NavLink to="/downloads" className={navLinkClasses}>
                            <DownloadIcon className="h-6 w-6" />
                            {context?.isSidebarOpen && <span>Downloads</span>}
                        </NavLink>
                        <div className="border-t border-zinc-800 my-4"></div>
                         <NavLink to="/studio" className={navLinkClasses}>
                            <CogIcon className="h-6 w-6" />
                            {context?.isSidebarOpen && <span>Creator Studio</span>}
                        </NavLink>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
