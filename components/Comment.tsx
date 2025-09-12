
import React from 'react';
import { Comment as CommentType } from '../types';
import { LikeIcon, DislikeIcon } from '../constants';
import { formatNumber } from '../utils/formatters';

interface CommentProps {
    comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div className="flex items-start space-x-4">
            <img 
                src={comment.userImage} 
                alt={comment.username}
                className="w-10 h-10 rounded-full object-cover" 
            />
            <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                    <p className="font-semibold text-sm text-white">{comment.username}</p>
                    <p className="text-xs text-zinc-400">{comment.timestamp}</p>
                </div>
                <p className="text-zinc-200 text-base mt-1">{comment.text}</p>
                <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                        <LikeIcon className="w-5 h-5" />
                        <span className="text-xs font-medium">{formatNumber(comment.likes)}</span>
                    </button>
                    <button className="text-zinc-400 hover:text-white transition-colors">
                        <DislikeIcon className="w-5 h-5" />
                    </button>
                    <button className="text-xs font-semibold text-zinc-400 hover:text-white">REPLY</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
