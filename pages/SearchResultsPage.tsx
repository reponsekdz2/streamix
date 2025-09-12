
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS } from '../constants';
import { Video } from '../types';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const query = searchParams.get('search_query') || '';

  useEffect(() => {
    if (query) {
      const results = MOCK_VIDEOS.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channel.name.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVideos(results);
    } else {
      setFilteredVideos([]);
    }
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        Results for: <span className="text-netflix-red">{query}</span>
      </h2>
      <VideoGrid videos={filteredVideos} />
    </div>
  );
};

export default SearchResultsPage;
