
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Video } from '../types';
import { LikeIcon, ShareIcon, DislikeIcon } from '../constants';
import { formatNumber } from '../utils/formatters';
import { Link } from 'react-router-dom';

interface ShortsPlayerProps {
    short: Video;
    isVisible: boolean;
}

const ShortsPlayer: React.FC<ShortsPlayerProps> = ({ short, isVisible }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const playerRef = useRef<ReactPlayer>(null);

    const handleVideoClick = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <div className="h-full w-full relative rounded-lg overflow-hidden" onClick={handleVideoClick}>
             <ReactPlayer
                ref={playerRef}
                url={short.videoUrl}
                playing={isVisible && isPlaying}
                loop
                width="100%"
                height="100%"
                playsinline
                muted={true}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="flex justify-between items-end">
                    <div>
                        <Link to={`/profile/${short.channel.username}`} className="flex items-center gap-2 mb-2">
                             <img src={short.channel.avatarUrl} alt={short.channel.name} className="w-8 h-8 rounded-full border-2 border-white"/>
                            <p className="font-semibold text-white text-sm">@{short.channel.username}</p>
                        </Link>
                        <h3 className="text-white text-base font-medium leading-snug">{short.title}</h3>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-white">
                        <button className="flex flex-col items-center">
                            <LikeIcon className="w-8 h-8"/>
                            <span className="text-xs font-semibold">{formatNumber(short.likes)}</span>
                        </button>
                         <button className="flex flex-col items-center">
                            <DislikeIcon className="w-8 h-8"/>
                        </button>
                        <button className="flex flex-col items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 12s4.03 8.25 9 8.25z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008z" />
                           </svg>
                            <span className="text-xs font-semibold">{formatNumber(short.comments.length)}</span>
                        </button>
                        <button className="flex flex-col items-center">
                            <ShareIcon className="w-8 h-8"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortsPlayer;
