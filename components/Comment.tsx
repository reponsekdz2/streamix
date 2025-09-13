
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// FIX: Corrected import paths.
import { Comment as CommentType } from '../types';
import { LikeIcon, DislikeIcon } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { formatNumber } from '../utils/formatters';

interface CommentProps {
    comment: CommentType;
    onReply: (commentId: string, text: string) => Promise<void>;
    onUpdate: (commentId: string, text: string) => Promise<void>;
    onDelete: (commentId: string) => Promise<void>;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply, onUpdate, onDelete }) => {
    const { user } = useAuth();
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [editText, setEditText] = useState(comment.text);

    const formatTimestamp = (timestamp: string) => {
        try {
            const date = new Date(timestamp);
            const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
            let interval = seconds / 31536000;
            if (interval > 1) return Math.floor(interval) + " years ago";
            interval = seconds / 2592000;
            if (interval > 1) return Math.floor(interval) + " months ago";
            interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + " days ago";
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + " hours ago";
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + " minutes ago";
            return Math.floor(seconds) + " seconds ago";
        } catch (e) { return timestamp; }
    };
    
    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        await onReply(comment.id, replyText);
        setReplyText('');
        setIsReplying(false);
    }
    
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editText.trim()) return;
        await onUpdate(comment.id, editText);
        setIsEditing(false);
    }

    return (
        <div className="flex items-start space-x-4">
            <Link to={`/profile/${comment.user.username}`}>
                <img src={comment.user.avatarUrl} alt={comment.user.username} className="w-10 h-10 rounded-full object-cover" />
            </Link>
            <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                    <Link to={`/profile/${comment.user.username}`} className="font-semibold text-sm text-white hover:underline">@{comment.user.username}</Link>
                    <p className="text-xs text-zinc-400">{formatTimestamp(comment.timestamp)}</p>
                </div>
                {!isEditing ? (
                    <p className="text-zinc-200 text-base mt-1 whitespace-pre-wrap">{comment.text}</p>
                ) : (
                    <form onSubmit={handleUpdateSubmit} className="mt-2">
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full bg-zinc-700 border border-zinc-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
                            rows={2}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <button type="button" onClick={() => setIsEditing(false)} className="text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-zinc-800">Cancel</button>
                            <button type="submit" className="text-sm font-semibold px-4 py-1.5 rounded-full bg-netflix-red hover:bg-red-700">Save</button>
                        </div>
                    </form>
                )}
                
                <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                        <LikeIcon className="w-5 h-5" />
                        <span className="text-xs font-medium">{formatNumber(comment.likes)}</span>
                    </button>
                    <button className="text-zinc-400 hover:text-white transition-colors">
                        <DislikeIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsReplying(!isReplying)} className="text-xs font-semibold text-zinc-400 hover:text-white">REPLY</button>
                     {user?.id === comment.user.id && !isEditing && (
                        <>
                            <button onClick={() => setIsEditing(true)} className="text-xs font-semibold text-zinc-400 hover:text-white">EDIT</button>
                            <button onClick={() => onDelete(comment.id)} className="text-xs font-semibold text-zinc-400 hover:text-red-500">DELETE</button>
                        </>
                     )}
                </div>
                
                {isReplying && (
                     <form onSubmit={handleReplySubmit} className="flex items-start gap-3 mt-4">
                        <img src={user?.avatarUrl} alt={user?.name} className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Replying to @${comment.user.username}`}
                                className="w-full bg-transparent border-b-2 border-zinc-700 focus:border-white focus:outline-none text-white transition-colors"
                                rows={1}
                            ></textarea>
                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => setIsReplying(false)} className="text-sm font-semibold px-4 py-2 rounded-full hover:bg-zinc-800">Cancel</button>
                                <button type="submit" disabled={!replyText.trim()} className="text-sm font-semibold px-4 py-2 rounded-full bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-500">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </form>
                )}
                
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-6 border-l-2 border-zinc-800 space-y-4">
                        {comment.replies.map(reply => (
                            <Comment key={reply.id} comment={reply} onReply={onReply} onUpdate={onUpdate} onDelete={onDelete} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;