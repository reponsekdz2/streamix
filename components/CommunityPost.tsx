
import React from 'react';
// FIX: Corrected import paths.
import { CommunityPost as CommunityPostType } from '../types';
import { LikeIcon, DislikeIcon, ShareIcon } from '../constants';
import { formatNumber } from '../utils/formatters';

interface CommunityPostProps {
    post: CommunityPostType;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
                <img src={post.user.avatarUrl} alt={post.user.username} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-semibold text-white">@{post.user.username}</p>
                    <p className="text-xs text-zinc-400">{new Date(post.timestamp).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-zinc-200 mt-4 whitespace-pre-wrap">{post.text}</p>
             <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-zinc-800">
                <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
                    <LikeIcon className="w-5 h-5"/>
                    <span>{formatNumber(post.likes)}</span>
                </button>
                 <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
                    <DislikeIcon className="w-5 h-5"/>
                </button>
                 <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
                    <ShareIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

export default CommunityPost;