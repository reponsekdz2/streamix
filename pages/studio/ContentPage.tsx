
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { Video } from '../../types';
import Spinner from '../../components/Spinner';
import EditVideoModal from '../../components/EditVideoModal';
import { formatNumber } from '../../utils/formatters';
import { Link } from 'react-router-dom';

const ContentPage: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingVideo, setEditingVideo] = useState<Video | null>(null);

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const data = await apiService.get<Video[]>('/studio/content');
            setVideos(data);
        } catch (error) {
            console.error("Failed to fetch content:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchContent();
    }, []);

    const handleDelete = async (videoId: string) => {
        if (window.confirm("Are you sure you want to permanently delete this video?")) {
            try {
                await apiService.delete(`/studio/videos/${videoId}`);
                setVideos(prev => prev.filter(v => v.id !== videoId));
            } catch (error) {
                console.error("Failed to delete video:", error);
                alert("Could not delete video. Please try again.");
            }
        }
    };

    const handleUpdateVideo = (updatedVideo: Video) => {
        setVideos(prev => prev.map(v => v.id === updatedVideo.id ? updatedVideo : v));
    };

    if (isLoading) return <div className="flex justify-center mt-10"><Spinner/></div>

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Channel Content</h1>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-zinc-800">
                    <thead className="bg-zinc-800">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Video</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Views</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Likes</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Privacy</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {videos.map(video => (
                            <tr key={video.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                        <div className="h-10 w-20 flex-shrink-0">
                                            <img className="h-10 w-20 rounded-md object-cover" src={video.thumbnailUrl} alt={video.title} />
                                        </div>
                                        <div className="ml-4">
                                            <Link to={`/watch/${video.id}`} className="font-medium text-white hover:text-netflix-red line-clamp-2">{video.title}</Link>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">{formatNumber(video.views)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">{formatNumber(video.likes)}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300 capitalize">{video.privacy}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button onClick={() => setEditingVideo(video)} className="text-netflix-red hover:text-red-400 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(video.id)} className="text-zinc-400 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {editingVideo && (
                <EditVideoModal 
                    video={editingVideo} 
                    closeModal={() => setEditingVideo(null)} 
                    onVideoUpdate={handleUpdateVideo}
                />
             )}
        </div>
    );
};

export default ContentPage;
