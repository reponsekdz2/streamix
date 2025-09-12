
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_VIDEOS } from '../constants';
import { Video, Comment as CommentType } from '../types';
import { formatNumber } from '../utils/formatters';
import { LikeIcon, DislikeIcon, ShareIcon, MoreIcon } from '../constants';
import Comment from '../components/Comment';
import { generateCommentsForVideo } from '../services/geminiService';
import Spinner from '../components/Spinner';

const WatchPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [video, setVideo] = useState<Video | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);

    useEffect(() => {
        const foundVideo = MOCK_VIDEOS.find(v => v.id === id) || null;
        setVideo(foundVideo);
        if (foundVideo) {
            fetchComments(foundVideo.title);
        }
    }, [id]);

    const fetchComments = async (videoTitle: string) => {
        setIsLoadingComments(true);
        setCommentError(null);
        try {
            const aiComments = await generateCommentsForVideo(videoTitle);
            setComments(aiComments);
        } catch (error: any) {
            setCommentError(error.message || 'Failed to load comments.');
        } finally {
            setIsLoadingComments(false);
        }
    };

    if (!video) {
        return <div className="text-center text-white text-2xl mt-20">Video not found.</div>;
    }

    const recommendedVideos = MOCK_VIDEOS.filter(v => v.id !== id).slice(0, 10);

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow lg:w-2/3">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    {/* In a real app, this would be a video player component */}
                    <img src={`https://picsum.photos/seed/${video.id}/1280/720`} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-2xl font-bold text-white mt-4">{video.title}</h1>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                        <Link to={`/profile/${video.channel.name.toLowerCase()}`}>
                            <img src={video.channel.avatarUrl} alt={video.channel.name} className="h-10 w-10 rounded-full" />
                        </Link>
                        <div>
                            <p className="text-white font-semibold">{video.channel.name}</p>
                            <p className="text-zinc-400 text-sm">2.3M subscribers</p>
                        </div>
                         <button className="bg-white text-black font-semibold px-4 py-2 rounded-full text-sm ml-4 hover:bg-zinc-200">Subscribe</button>
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <div className="flex items-center bg-zinc-800 rounded-full">
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 rounded-l-full">
                                <LikeIcon className="w-5 h-5" />
                                <span className="text-sm font-semibold">{formatNumber(123000)}</span>
                            </button>
                             <div className="w-px h-6 bg-zinc-600"></div>
                            <button className="px-4 py-2 hover:bg-zinc-700 rounded-r-full">
                                <DislikeIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
                            <ShareIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Share</span>
                        </button>
                         <button className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
                            <MoreIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg mt-4">
                    <p className="font-semibold text-white text-sm">{formatNumber(video.views)} views &middot; {video.uploadedAt}</p>
                    <p className="text-zinc-300 text-sm mt-2 whitespace-pre-wrap">{video.description}</p>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-white mb-4">{comments.length > 0 ? `${comments.length} Comments` : 'Comments'}</h2>
                    {isLoadingComments && <div className="flex justify-center p-8"><Spinner /></div>}
                    {commentError && <p className="text-red-500 text-center">{commentError}</p>}
                    {!isLoadingComments && !commentError && (
                         <div className="space-y-6">
                            {comments.map((comment, index) => <Comment key={index} comment={comment} />)}
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:w-1/3 flex-shrink-0">
                <h3 className="text-lg font-bold text-white mb-4">Up next</h3>
                <div className="space-y-4">
                     {recommendedVideos.map(recVideo => (
                        <div key={recVideo.id} className="grid grid-cols-2 gap-3">
                             <Link to={`/watch/${recVideo.id}`} className="flex flex-col group">
                                <div className="relative">
                                    <img src={recVideo.thumbnailUrl} alt={recVideo.title} className="w-full rounded-lg object-cover aspect-video" />
                                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                                    {recVideo.duration}
                                    </span>
                                </div>
                            </Link>
                             <div className="flex-1">
                                <h3 className="text-white text-sm font-medium leading-snug line-clamp-2">
                                    <Link to={`/watch/${recVideo.id}`}>{recVideo.title}</Link>
                                </h3>
                                <p className="text-zinc-400 text-xs mt-1">{recVideo.channel.name}</p>
                                <p className="text-zinc-400 text-xs">
                                    {formatNumber(recVideo.views)} views &middot; {recVideo.uploadedAt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
