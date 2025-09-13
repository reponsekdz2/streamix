
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import Spinner from './Spinner';
import { Channel } from '../types';

interface CustomizeProfileModalProps {
    closeModal: () => void;
    onUpdate: (updatedChannel: Channel) => void;
}

const CustomizeProfileModal: React.FC<CustomizeProfileModalProps> = ({ closeModal, onUpdate }) => {
    const { user } = useAuth();
    const [channel, setChannel] = useState<Channel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChannel = async () => {
            if (!user) return;
            try {
                const data = await apiService.get<Channel>(`/channels/u/${user.username}`);
                setChannel(data);
            } catch (err) {
                setError('Failed to load channel data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchChannel();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!channel) return;
        setChannel({ ...channel, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!channel) return;
        setIsSaving(true);
        setError('');
        try {
            const updatedChannel = await apiService.put<Channel>('/channels/me', {
                name: channel.name,
                username: channel.username,
                description: channel.description,
            });
            onUpdate(updatedChannel);
            closeModal();
        } catch (err: any) {
            setError(err.message || 'Failed to save changes.');
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-md border border-zinc-700">
                <div className="flex items-center justify-between p-4 border-b border-zinc-700">
                    <h2 className="text-lg font-semibold text-white">Customize Channel</h2>
                    <button onClick={closeModal} className="text-zinc-400 text-2xl leading-none hover:text-white">&times;</button>
                </div>
                {isLoading ? <div className="p-6 flex justify-center"><Spinner /></div> : channel ? (
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Channel Name</label>
                            <input
                                type="text"
                                name="name"
                                value={channel.name}
                                onChange={handleChange}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Handle</label>
                            <input
                                type="text"
                                name="username"
                                value={channel.username}
                                onChange={handleChange}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={channel.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white"
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <div className="flex justify-end p-4 bg-zinc-800 border-t border-zinc-700 rounded-b-lg gap-3">
                        <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md hover:bg-zinc-700 font-semibold">Cancel</button>
                        <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-md bg-netflix-red hover:bg-red-700 font-semibold w-24 flex justify-center">
                           {isSaving ? <Spinner/> : 'Save'}
                        </button>
                    </div>
                </form>
                ) : <div className="p-6 text-center text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default CustomizeProfileModal;
