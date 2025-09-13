
import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
// FIX: Corrected import paths.
import { HistoryIcon } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { Video } from '../types';
import { apiService } from '../services/apiService';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
      const fetchHistory = async () => {
          if (!isAuthenticated) {
              setIsLoading(false);
              setHistory([]);
              return;
          }
          setIsLoading(true);
          try {
              const data = await apiService.get<Video[]>('/users/me/history');
              setHistory(data);
          } catch (error) {
              console.error("Failed to fetch watch history:", error);
          } finally {
              setIsLoading(false);
          }
      };
      fetchHistory();
  }, [isAuthenticated]);

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <HistoryIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Watch History</h1>
        </div>
      <VideoGrid videos={history} isLoading={isLoading} />
    </div>
  );
};

export default HistoryPage;