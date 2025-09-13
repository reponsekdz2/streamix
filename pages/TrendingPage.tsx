
import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
// FIX: Corrected import paths.
import { FireIcon } from '../constants';
import { Video } from '../types';
import { apiService } from '../services/apiService';

const TrendingPage: React.FC = () => {
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.get<Video[]>('/videos/trending');
        setTrendingVideos(data);
      } catch (error) {
        console.error("Failed to fetch trending videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <FireIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Trending</h1>
        </div>
      <VideoGrid videos={trendingVideos} isLoading={isLoading} />
    </div>
  );
};

export default TrendingPage;