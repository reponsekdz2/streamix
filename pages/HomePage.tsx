
import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS } from '../constants';

const categories = ['All', 'Music', 'Gaming', 'Live', 'Trailers', 'React', 'Debates', 'Podcasts', 'Recently uploaded'];

const CategoryPill: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            isActive ? 'bg-white text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-white'
        }`}
    >
        {label}
    </button>
);


const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  // In a real app, you'd filter videos based on category
  const displayedVideos = MOCK_VIDEOS; 

  return (
    <div className="space-y-6">
      <div className="border-b border-t border-zinc-800 sticky top-[64px] z-30 bg-netflix-dark py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
         <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {categories.map(category => (
                <CategoryPill 
                    key={category} 
                    label={category} 
                    isActive={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                />
            ))}
        </div>
      </div>
      <VideoGrid videos={displayedVideos} title="Recommended For You" isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
