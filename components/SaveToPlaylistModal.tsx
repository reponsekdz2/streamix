
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for types.
import { Playlist } from '../types';
import { apiService } from '../services/apiService';
import Spinner from './Spinner';

interface SaveToPlaylistModalProps {
    videoId: string;
    closeModal: () => void;
}

const SaveToPlaylistModal: React.FC<SaveToPlaylistModalProps> = ({ videoId, closeModal }) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const data = await apiService.get<Playlist[]>('/playlists');
                setPlaylists(data);
            } catch (error) {
                console.error("Failed to fetch playlists:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlaylists();
    }, []);

    const handleTogglePlaylist = async (playlist: Playlist) => {
        const isVideoInPlaylist = playlist.videoIds.includes(videoId);
        // Optimistic update
        setPlaylists(prev => prev.map(p => {
            if (p.id === playlist.id) {
                return {
                    ...p,
                    videoIds: isVideoInPlaylist ? p.videoIds.filter(id => id !== videoId) : [...p.videoIds, videoId]
                };
            }
            return p;
        }));

        try {
            if (isVideoInPlaylist) {
                await apiService.delete(`/playlists/${playlist.id}/videos/${videoId}`);
            } else {
                await apiService.post(`/playlists/${playlist.id}/videos`, { videoId });
            }
        } catch (error) {
            console.error("Failed to update playlist", error);
            // Revert on error
             setPlaylists(prev => prev.map(p => {
                if (p.id === playlist.id) {
                    return {
                        ...p,
                        videoIds: !isVideoInPlaylist ? p.videoIds.filter(id => id !== videoId) : [...p.videoIds, videoId]
                    };
                }
                return p;
            }));
        }
    };

    const handleCreatePlaylist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPlaylistName.trim()) return;
        try {
            const newPlaylist = await apiService.post<Playlist>('/playlists', { name: newPlaylistName });
            await apiService.post(`/playlists/${newPlaylist.id}/videos`, { videoId });
            setPlaylists(prev => [...prev, { ...newPlaylist, videoIds: [videoId] }]);
            setNewPlaylistName('');
            setIsCreating(false);
        } catch (error) {
            console.error("Failed to create playlist", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-sm border border-zinc-700">
                <div className="flex items-center justify-between p-4 border-b border-zinc-700">
                    <h2 className="text-lg font-semibold text-white">Save to...</h2>
                    <button onClick={closeModal} className="text-zinc-400 text-2xl leading-none hover:text-white">&times;</button>
                </div>
                <div className="p-4 max-h-64 overflow-y-auto">
                    {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
                        <ul className="space-y-2">
                            {playlists.map(playlist => (
                                <li key={playlist.id}>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={playlist.videoIds.includes(videoId)}
                                            onChange={() => handleTogglePlaylist(playlist)}
                                            className="w-5 h-5 bg-zinc-700 border-zinc-600 text-netflix-red focus:ring-netflix-red"
                                        />
                                        <span className="text-white">{playlist.name}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="p-4 border-t border-zinc-700">
                    {!isCreating ? (
                        <button onClick={() => setIsCreating(true)} className="text-netflix-red font-semibold text-sm">+ Create new playlist</button>
                    ) : (
                        <form onSubmit={handleCreatePlaylist}>
                            <input
                                type="text"
                                value={newPlaylistName}
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                placeholder="Enter playlist name..."
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => setIsCreating(false)} className="text-sm font-semibold text-zinc-300">Cancel</button>
                                <button type="submit" className="text-sm font-semibold text-netflix-red disabled:text-zinc-500" disabled={!newPlaylistName.trim()}>Create</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaveToPlaylistModal;