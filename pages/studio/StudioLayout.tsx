
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChartBarIcon, VideoCameraIcon, ChatBubbleLeftRightIcon } from '../../constants';

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);


const StudioLayout: React.FC = () => {
    const { user } = useAuth();

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors ${isActive ? 'bg-zinc-800 font-semibold' : 'text-zinc-400'}`;

    return (
        <div className="flex">
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 h-[calc(100vh-4rem)] flex-shrink-0">
                 <div className="flex items-center gap-3 mb-6">
                    <img src={user?.avatarUrl} alt={user?.name} className="h-10 w-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-white text-sm">Your Channel</p>
                        <p className="text-zinc-400 text-xs">{user?.name}</p>
                    </div>
                </div>
                <nav className="space-y-2">
                     <NavLink to="/studio" end className={navLinkClasses}>
                        <HomeIcon className="h-6 w-6" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/studio/content" className={navLinkClasses}>
                        <VideoCameraIcon className="h-6 w-6" />
                        <span>Content</span>
                    </NavLink>
                     <NavLink to="/studio/analytics" className={navLinkClasses}>
                        <ChartBarIcon className="h-6 w-6" />
                        <span>Analytics</span>
                    </NavLink>
                     <NavLink to="/studio/comments" className={navLinkClasses}>
                        <ChatBubbleLeftRightIcon className="h-6 w-6" />
                        <span>Comments</span>
                    </NavLink>
                </nav>
            </aside>
            <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
                <Outlet />
            </div>
        </div>
    );
};

export default StudioLayout;
