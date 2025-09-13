
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { Video } from '../types';
import { apiService } from '../services/apiService';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const SearchResultsPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [sortBy, setSortBy] = useState('relevance');
  const [duration, setDuration] = useState('any');

  const query = useQuery();
  const searchQuery = query.get('search_query');

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setVideos([]);
        setIsLoading(false);
        return;
      };
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
            q: searchQuery,
            sortBy,
            duration,
        });
        const data = await apiService.get<Video[]>(`/search?${params.toString()}`);
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, sortBy, duration]);
  
  const FilterDropdown: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: {value: string; label: string}[]}> = 
    ({label, value, onChange, options}) => (
        <div>
            <label className="text-xs text-zinc-400">{label}</label>
            <select value={value} onChange={onChange} className="bg-zinc-800 border-zinc-700 rounded-md text-white text-sm focus:ring-netflix-red">
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">
          Results for: <span className="text-netflix-red">{searchQuery}</span>
        </h1>
        <div className="flex items-center gap-4">
            <FilterDropdown 
                label="Sort By" value={sortBy} onChange={e => setSortBy(e.target.value)}
                options={[
                    {value: 'relevance', label: 'Relevance'},
                    {value: 'date', label: 'Upload Date'},
                    {value: 'views', label: 'View Count'},
                ]}
            />
             <FilterDropdown 
                label="Duration" value={duration} onChange={e => setDuration(e.target.value)}
                options={[
                    {value: 'any', label: 'Any'},
                    {value: 'short', label: 'Under 4 min'},
                    {value: 'long', label: 'Over 20 min'},
                ]}
            />
        </div>
      </div>
      <VideoGrid videos={videos} isLoading={isLoading} />
    </div>
  );
};

export default SearchResultsPage;
