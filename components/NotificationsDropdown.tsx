
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_NOTIFICATIONS } from '../constants';
// FIX: Corrected import path for types.
import { Notification } from '../types';

interface NotificationsDropdownProps {
  closeDropdown: () => void;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
    <Link to="#" className="flex items-start gap-3 p-3 hover:bg-zinc-700 transition-colors">
        <img src={notification.user.avatarUrl} alt={notification.user.name} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1">
            <p className="text-sm text-zinc-200">
                <span className="font-semibold text-white">{notification.user.name}</span>
                {notification.type === 'upload' ? ' uploaded a new video: ' : ' commented on your video: '}
                <span className="font-semibold text-white">"{notification.video.title}"</span>
            </p>
            <p className="text-xs text-zinc-400 mt-1">{notification.time}</p>
        </div>
        {!notification.read && <div className="w-2.5 h-2.5 bg-netflix-red rounded-full mt-1 flex-shrink-0"></div>}
    </Link>
);

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ closeDropdown }) => {
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

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-3 w-80 sm:w-96 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700">
            <h3 className="font-semibold text-white">Notifications</h3>
            <Link to="/settings" className="text-sm text-netflix-red hover:text-red-400">Settings</Link>
        </div>
        <div className="max-h-96 overflow-y-auto">
            {MOCK_NOTIFICATIONS.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </div>
    </div>
  );
};

export default NotificationsDropdown;