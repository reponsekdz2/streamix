
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
// FIX: Corrected import path for types.
import { CommunityPost as CommunityPostType } from '../types';
import Spinner from './Spinner';
import CommunityPost from './CommunityPost';
import { useAuth } from '../contexts/AuthContext';

interface CommunityTabProps {
    channelId: string;
    isOwner: boolean;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ channelId, isOwner }) => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<CommunityPostType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newPostText, setNewPostText] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await apiService.get<CommunityPostType[]>(`/channels/${channelId}/posts`);
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch community posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [channelId]);

    const handlePostSubmit = async () => {
        if (!newPostText.trim()) return;
        try {
            const newPost = await apiService.post<CommunityPostType>(`/channels/${channelId}/posts`, { text: newPostText });
            setPosts(prev => [newPost, ...prev]);
            setNewPostText('');
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    };

    if (isLoading) return <div className="flex justify-center"><Spinner /></div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {isOwner && (
                 <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                     <div className="flex items-start gap-4">
                        <img src={user?.avatarUrl} alt={user?.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <textarea
                                value={newPostText}
                                onChange={(e) => setNewPostText(e.target.value)}
                                placeholder="Create a new post..."
                                className="w-full bg-transparent focus:outline-none text-white text-lg"
                                rows={3}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button onClick={handlePostSubmit} disabled={!newPostText.trim()} className="text-sm font-semibold px-4 py-2 rounded-full bg-netflix-red hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed">
                                    Post
                                </button>
                            </div>
                        </div>
                     </div>
                 </div>
            )}
            {posts.map(post => (
                <CommunityPost key={post.id} post={post} />
            ))}
            {posts.length === 0 && !isLoading && <p className="text-center text-zinc-400">This channel hasn't posted yet.</p>}
        </div>
    );
};

export default CommunityTab;