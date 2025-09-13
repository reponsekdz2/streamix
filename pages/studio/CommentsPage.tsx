
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { Comment as CommentType } from '../../types';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

const CommentsPage: React.FC = () => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const data = await apiService.get<CommentType[]>('/studio/comments');
                setComments(data);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, []);

    const formatTimestamp = (timestamp: string) => {
        try {
            const date = new Date(timestamp);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (e) { return timestamp; }
    };
    
    if (isLoading) return <div className="flex justify-center mt-10"><Spinner/></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Channel Comments</h1>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg">
                <ul role="list" className="divide-y divide-zinc-800">
                    {comments.map((comment) => (
                        <li key={comment.id} className="flex items-start gap-x-4 p-5">
                            <img className="h-10 w-10 flex-none rounded-full bg-zinc-800" src={comment.user.avatarUrl} alt="" />
                            <div className="flex-auto">
                                <div className="flex items-baseline justify-between gap-x-4">
                                    <p className="text-sm font-semibold leading-6 text-white">{comment.user.name}</p>
                                    <p className="flex-none text-xs text-zinc-500">
                                        <time dateTime={comment.timestamp}>{formatTimestamp(comment.timestamp)}</time>
                                    </p>
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-300">{comment.text}</p>
                            </div>
                            <div className="flex-none self-center">
                               <Link to={`/watch/${comment.videoId}`}>
                                 <img className="h-10 w-20 rounded-md object-cover" src={`https://source.unsplash.com/random/400x225?sig=${comment.videoId}`} alt={comment.videoTitle} title={comment.videoTitle} />
                               </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommentsPage;
