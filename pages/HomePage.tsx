
import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
// FIX: Corrected import path for types.
import { Video } from '../types';
import { apiService } from '../services/apiService';

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.get<Video[]>('/videos');
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <VideoGrid videos={videos} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;