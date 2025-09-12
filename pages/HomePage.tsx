
import React from 'react';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div>
      <VideoGrid videos={MOCK_VIDEOS} />
    </div>
  );
};

export default HomePage;
