
import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Corrected import path for types.
import { Video } from '../types';
import { formatNumber } from '../utils/formatters';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="flex flex-col group">
      <div className="relative">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full rounded-lg object-cover aspect-video group-hover:rounded-none transition-all duration-200" />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="flex items-start mt-3">
        <Link to={`/profile/${video.channel.name.toLowerCase()}`} className="flex-shrink-0">
          <img src={video.channel.avatarUrl} alt={video.channel.name} className="h-9 w-9 rounded-full mr-3" />
        </Link>
        <div className="flex-1">
          <h3 className="text-white text-base font-medium leading-snug group-hover:text-white transition-colors">
            {video.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-1 group-hover:text-white transition-colors">{video.channel.name}</p>
          <p className="text-zinc-400 text-sm">
            {formatNumber(video.views)} views &middot; {video.uploadedAt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;