
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_VIDEOS, MOCK_COMMENTS, LikeIcon, DislikeIcon, ShareIcon } from '../constants';
import { Video, Comment as CommentType } from '../types';
import { formatNumber } from '../utils/formatters';
import VideoGrid from '../components/VideoGrid';
import Comment from '../components/Comment';

const WatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const currentVideo = MOCK_VIDEOS.find(v => v.id === id);
    setVideo(currentVideo || null);
    window.scrollTo(0, 0);
  }, [id]);

  if (!video) {
    return <div className="text-center text-xl mt-10">Video not found.</div>;
  }

  const recommendedVideos = MOCK_VIDEOS.filter(v => v.id !== id).slice(0, 4);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/3">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg mb-4">
          <img src={video.thumbnailUrl.replace('640/360', '1280/720')} alt={video.title} className="w-full h-full object-cover rounded-lg"/>
        </div>

        {/* Video Info */}
        <h1 className="text-2xl font-bold text-white">{video.title}</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-4">
          <div className="flex items-center">
            <img src={video.channel.avatarUrl} alt={video.channel.name} className="w-12 h-12 rounded-full" />
            <div className="ml-4">
              <p className="text-white font-semibold">{video.channel.name}</p>
              <p className="text-zinc-400 text-sm">{formatNumber(video.channel.subscribers)} subscribers</p>
            </div>
            <button className="ml-6 bg-netflix-red text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors">Subscribe</button>
          </div>
          <div className="flex items-center space-x-2">
             <div className="flex items-center bg-zinc-800 rounded-full">
                <button className="flex items-center gap-2 pl-4 pr-3 py-2 text-sm font-semibold hover:bg-zinc-700 rounded-l-full">
                    <LikeIcon className="w-5 h-5"/>
                    <span>{formatNumber(video.views)}</span>
                </button>
                <div className="w-px h-6 bg-zinc-600"></div>
                <button className="p-2 hover:bg-zinc-700 rounded-r-full">
                    <DislikeIcon className="w-5 h-5"/>
                </button>
             </div>
             <button className="flex items-center gap-2 p-2 px-4 bg-zinc-800 rounded-full text-sm font-semibold hover:bg-zinc-700">
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
             </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-zinc-800 rounded-lg p-4 mt-4 text-sm">
          <div className="flex font-semibold space-x-4">
             <p>{formatNumber(video.views)} views</p>
             <p>{video.uploadedAt}</p>
          </div>
          <p className={`mt-2 text-zinc-300 whitespace-pre-wrap ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
            {video.description}
          </p>
          <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className="text-white font-semibold mt-2">
            {isDescriptionExpanded ? 'Show less' : '...more'}
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">{MOCK_COMMENTS.length} Comments</h2>
            <div className="space-y-6 mt-6">
                {MOCK_COMMENTS.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
            </div>
        </div>

      </div>
      <div className="w-full lg:w-1/3">
        <h3 className="text-lg font-bold mb-4">Up next</h3>
        <div className="space-y-4">
            {recommendedVideos.map(recVideo => (
                 <Link to={`/watch/${recVideo.id}`} key={recVideo.id} className="flex group gap-3">
                    <img src={recVideo.thumbnailUrl} alt={recVideo.title} className="w-40 h-24 object-cover rounded-lg"/>
                    <div>
                        <h4 className="text-sm font-semibold text-white leading-snug group-hover:text-red-500 transition-colors line-clamp-2">{recVideo.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1">{recVideo.channel.name}</p>
                         <p className="text-xs text-zinc-400">{formatNumber(recVideo.views)} views</p>
                    </div>
                 </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
