
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// FIX: Corrected import paths.
import { Playlist as PlaylistType } from '../types';
import { apiService } from '../services/apiService';
import Spinner from '../components/Spinner';
import VideoGrid from '../components/VideoGrid';
import { PlaylistIcon } from '../constants';

const PlaylistPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [playlist, setPlaylist] = useState<PlaylistType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const data = await apiService.get<PlaylistType>(`/playlists/${id}`);
                setPlaylist(data);
            } catch (error) {
                console.error("Failed to fetch playlist:", error);
                setPlaylist(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlaylist();
    }, [id]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-96"><Spinner /></div>;
    }

    if (!playlist) {
        return <div className="text-center text-white text-2xl mt-20">Playlist not found.</div>;
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <PlaylistIcon className="w-8 h-8 text-netflix-red" />
                <div>
                    <h1 className="text-3xl font-bold text-white">{playlist.name}</h1>
                    <p className="text-zinc-400">{playlist.videos?.length} videos</p>
                </div>
            </div>
            <VideoGrid videos={playlist.videos || []} isLoading={isLoading} />
        </div>
    );
};

export default PlaylistPage;