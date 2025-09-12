
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { formatNumber } from '../utils/formatters';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="flex flex-col group">
      <div className="relative overflow-hidden rounded-lg">
        <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105" 
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
        {video.watchedPercentage && video.watchedPercentage > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-700 bg-opacity-75">
            <div 
              className="h-full bg-netflix-red" 
              style={{ width: `${video.watchedPercentage}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="flex items-start mt-3">
        <img src={video.channel.avatarUrl} alt={video.channel.name} className="h-9 w-9 rounded-full mr-3" />
        <div className="flex-1">
          <h3 className="text-white text-base font-medium leading-snug group-hover:text-red-500 transition-colors">
            {video.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-1">{video.channel.name}</p>
          <div className="text-zinc-400 text-sm flex items-center">
            <span>{formatNumber(video.views)} views</span>
            <span className="mx-1.5 text-xs">&#9679;</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
