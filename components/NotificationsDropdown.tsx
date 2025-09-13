
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../types';
import { apiService } from '../services/apiService';
import Spinner from './Spinner';

interface NotificationsDropdownProps {
  closeDropdown: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ closeDropdown }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const data = await apiService.get<Notification[]>('/notifications');
                setNotifications(data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotifications();
    }, []);

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

    const handleMarkAsRead = async (id: string | 'all') => {
        // Optimistic update
        setNotifications(prev => prev.map(n => (id === 'all' || n.id === id) ? { ...n, read: true } : n));
        try {
            await apiService.post('/notifications/read', { ids: id });
        } catch (error) {
            console.error("Failed to mark notification as read", error);
            // Revert on failure (simple implementation)
        }
    };

    return (
        <div ref={dropdownRef} className="absolute right-0 mt-3 w-80 md:w-96 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg">
            <div className="p-3 border-b border-zinc-700 flex justify-between items-center">
                <h3 className="font-semibold text-white">Notifications</h3>
                <button onClick={() => handleMarkAsRead('all')} className="text-xs text-netflix-red hover:underline">Mark all as read</button>
            </div>
            <div className="py-1 max-h-96 overflow-y-auto">
                {isLoading ? <div className="flex justify-center p-4"><Spinner/></div> :
                notifications.length === 0 ? <p className="p-4 text-center text-zinc-400 text-sm">No new notifications.</p> :
                notifications.map(notification => (
                    <Link 
                        to={notification.link} 
                        key={notification.id} 
                        onClick={() => { handleMarkAsRead(notification.id); closeDropdown(); }} 
                        className={`flex items-start gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-700 ${!notification.read ? 'bg-zinc-900' : ''}`}
                    >
                        {!notification.read && <div className="mt-1.5 w-2 h-2 bg-netflix-red rounded-full flex-shrink-0"></div>}
                        <div className={notification.read ? 'opacity-70 ml-5' : ''}>
                            <p>{notification.text}</p>
                            <p className="text-xs text-zinc-400 mt-1">{notification.timestamp}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NotificationsDropdown;
