
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { Video, Comment as CommentType } from '../types';
import { apiService } from '../services/apiService';
import Spinner from '../components/Spinner';
import { LikeIcon, DislikeIcon, ShareIcon, PlaylistIcon, FlagIcon } from '../constants';
import VideoGrid from '../components/VideoGrid';
import Comment from '../components/Comment';
import { useAuth } from '../contexts/AuthContext';
import { formatNumber } from '../utils/formatters';
import { useMiniplayer } from '../contexts/MiniplayerContext';
import SaveToPlaylistModal from '../components/SaveToPlaylistModal';
import ReportModal from '../components/ReportModal';
import VideoChapters from '../components/VideoChapters';

const WatchPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user, isAuthenticated } = useAuth();
    const { activateMiniplayer } = useMiniplayer();

    const [video, setVideo] = useState<Video | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);
    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const [newCommentText, setNewCommentText] = useState('');

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const [videoData, relatedData, commentsData] = await Promise.all([
                    apiService.get<Video>(`/videos/${id}`),
                    apiService.get<Video[]>(`/videos/${id}/related`),
                    apiService.get<CommentType[]>(`/videos/${id}/comments`)
                ]);
                setVideo(videoData);
                setRelatedVideos(relatedData);
                setComments(commentsData);
                // In a real app, you'd fetch subscription status
                // For now, we'll leave it as a static state
            } catch (error) {
                console.error("Failed to fetch video data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVideoData();
        
        return () => {
            if(video) activateMiniplayer(video);
        }
    }, [id]);

    const handleInteraction = async (reaction: 'like' | 'dislike' | 'none') => {
        if (!video || !isAuthenticated) return;
        const originalLikes = video.likes;
        const originalDislikes = video.dislikes;

        // Optimistic update
        setVideo(prev => prev ? { ...prev, likes: reaction === 'like' ? prev.likes + 1 : prev.likes, dislikes: reaction === 'dislike' ? prev.dislikes + 1 : prev.dislikes } : null);

        try {
            // FIX: Add explicit type to apiService.post to resolve spread type error
            const updatedReactions = await apiService.post<{ likes: number; dislikes: number }>(`/videos/${video.id}/reaction`, { reaction });
            setVideo(prev => prev ? { ...prev, ...updatedReactions } : null);
        } catch (error) {
            console.error("Failed to update reaction:", error);
            // Revert on failure
            setVideo(prev => prev ? { ...prev, likes: originalLikes, dislikes: originalDislikes } : null);
        }
    };
    
    const handleSubscribe = async () => {
        if (!video || !isAuthenticated) return;
        const originalStatus = isSubscribed;
        setIsSubscribed(prev => !prev);
        try {
            const endpoint = isSubscribed ? 'unsubscribe' : 'subscribe';
            // FIX: Add explicit type to apiService.post to resolve property access error
            const result = await apiService.post<{ subscribed: boolean; subscribers: number }>(`/channels/${video.channel.id}/${endpoint}`, {});
            setVideo(prev => prev ? { ...prev, channel: { ...prev.channel, subscribers: result.subscribers }} : null);
        } catch (error) {
            console.error("Subscription failed:", error);
            setIsSubscribed(originalStatus);
        }
    };
    
    const findComment = (comments: CommentType[], id: string): CommentType | null => {
        for (const comment of comments) {
            if (comment.id === id) return comment;
            if (comment.replies) {
                const found = findComment(comment.replies, id);
                if (found) return found;
            }
        }
        return null;
    };
    
    const updateCommentsState = (updater: (draft: CommentType[]) => void) => {
        setComments(currentComments => {
            const newComments = JSON.parse(JSON.stringify(currentComments));
            updater(newComments);
            return newComments;
        });
    };

    const handlePostComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!video || !newCommentText.trim()) return;
        try {
            const newComment = await apiService.post<CommentType>(`/videos/${video.id}/comments`, { text: newCommentText });
            setComments(prev => [newComment, ...prev]);
            setNewCommentText('');
        } catch (error) {
            console.error("Failed to post comment:", error);
        }
    };

    const handleReply = async (commentId: string, text: string) => {
        if (!video) return;
        try {
            const newReply = await apiService.post<CommentType>(`/videos/${video.id}/comments`, { text, parentId: commentId });
            updateCommentsState(draft => {
                const parent = findComment(draft, commentId);
                if (parent) {
                    if (!parent.replies) parent.replies = [];
                    parent.replies.unshift(newReply);
                }
            });
        } catch (error) {
            console.error("Failed to post reply:", error);
        }
    };
    
    const handleUpdate = async (commentId: string, text: string) => {
        try {
            const updatedComment = await apiService.put<CommentType>(`/comments/${commentId}`, { text });
            updateCommentsState(draft => {
                const comment = findComment(draft, commentId);
                if (comment) comment.text = updatedComment.text;
            });
        } catch (error) {
            console.error("Failed to update comment:", error);
        }
    };

    const handleDelete = async (commentId: string) => {
       if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await apiService.delete(`/comments/${commentId}`);
                updateCommentsState(draft => {
                    const filterReplies = (comments: CommentType[]) => comments.filter(c => c.id !== commentId).map(c => {
                        if (c.replies) c.replies = filterReplies(c.replies);
                        return c;
                    });
                    const updated = filterReplies(draft);
                    // This is a bit brute force due to nested state complexity
                    setComments(updated);
                });
            } catch (error) {
                console.error("Failed to delete comment:", error);
            }
        }
    };


    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    if (!video) {
        return <div className="text-center text-white text-2xl mt-20">Video not found.</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow">
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    <ReactPlayer url={video.videoUrl} controls width="100%" height="100%" playing />
                </div>
                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-white">{video.title}</h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 text-zinc-400">
                        <span>{formatNumber(video.views)} views &middot; {video.uploadedAt}</span>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <button onClick={() => handleInteraction('like')} className="flex items-center gap-2 hover:text-white"><LikeIcon className="w-6 h-6"/> {formatNumber(video.likes)}</button>
                            <button onClick={() => handleInteraction('dislike')} className="flex items-center gap-2 hover:text-white"><DislikeIcon className="w-6 h-6"/></button>
                            <button className="flex items-center gap-2 hover:text-white"><ShareIcon className="w-6 h-6"/> Share</button>
                            <button onClick={() => setPlaylistModalOpen(true)} className="flex items-center gap-2 hover:text-white"><PlaylistIcon className="w-6 h-6"/> Save</button>
                            <button onClick={() => setReportModalOpen(true)} className="flex items-center gap-2 hover:text-white"><FlagIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 py-4 border-t border-b border-zinc-800">
                    <div className="flex items-center justify-between">
                        <Link to={`/profile/${video.channel.username}`} className="flex items-center gap-4">
                            <img src={video.channel.avatarUrl} alt={video.channel.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <h2 className="text-lg font-semibold text-white">{video.channel.name}</h2>
                                <p className="text-sm text-zinc-400">{formatNumber(video.channel.subscribers)} subscribers</p>
                            </div>
                        </Link>
                        <button onClick={handleSubscribe} className={`${isSubscribed ? 'bg-zinc-700' : 'bg-netflix-red hover:bg-red-700'} text-white font-semibold px-4 py-2 rounded-md`}>
                            {isSubscribed ? 'Subscribed' : 'Subscribe'}
                        </button>
                    </div>
                    <div className="mt-4 text-zinc-300 whitespace-pre-wrap bg-zinc-900 p-4 rounded-lg">
                        <p>{video.description}</p>
                         {video.chapters.length > 0 && <VideoChapters chapters={video.chapters} />}
                    </div>
                </div>
                
                {/* Comments Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-white mb-4">{comments.length} Comments</h2>
                     {isAuthenticated && user && (
                        <form onSubmit={handlePostComment} className="flex items-start gap-3 mb-8">
                            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <textarea
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full bg-transparent border-b-2 border-zinc-700 focus:border-white focus:outline-none text-white transition-colors"
                                    rows={1}
                                ></textarea>
                                {newCommentText && (
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button type="button" onClick={() => setNewCommentText('')} className="text-sm font-semibold px-4 py-2 rounded-full hover:bg-zinc-800">Cancel</button>
                                        <button type="submit" disabled={!newCommentText.trim()} className="text-sm font-semibold px-4 py-2 rounded-full bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-500">
                                            Comment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    )}
                    <div className="space-y-6">
                        {comments.map(comment => (
                             <Comment key={comment.id} comment={comment} onReply={handleReply} onUpdate={handleUpdate} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            </div>
            <aside className="lg:w-96 flex-shrink-0">
                <VideoGrid videos={relatedVideos} title="Up next" isLoading={isLoading} />
            </aside>
            {isPlaylistModalOpen && <SaveToPlaylistModal videoId={video.id} closeModal={() => setPlaylistModalOpen(false)} />}
            {isReportModalOpen && <ReportModal contentId={video.id} contentType="video" closeModal={() => setReportModalOpen(false)} />}
        </div>
    );
};

export default WatchPage;
