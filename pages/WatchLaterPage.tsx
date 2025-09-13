
import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
// FIX: Corrected import paths.
import { ClockIcon } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { Video } from '../types';
import { apiService } from '../services/apiService';

const WatchLaterPage: React.FC = () => {
  const [watchLater, setWatchLater] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchWatchLater = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        setWatchLater([]);
        return;
      }
      setIsLoading(true);
      try {
        const data = await apiService.get<Video[]>('/users/me/watch-later');
        setWatchLater(data);
      } catch (error) {
        console.error("Failed to fetch watch later list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWatchLater();
  }, [isAuthenticated]);

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <ClockIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Watch Later</h1>
        </div>
      <VideoGrid videos={watchLater} isLoading={isLoading} />
    </div>
  );
};

export default WatchLaterPage;