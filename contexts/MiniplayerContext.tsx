
import React, { createContext, useState, useContext, ReactNode } from 'react';
// FIX: Corrected import path for types.
import { Video } from '../types';

interface MiniplayerContextType {
  activeVideo: Video | null;
  isMiniplayerActive: boolean;
  activateMiniplayer: (video: Video) => void;
  deactivateMiniplayer: () => void;
}

const MiniplayerContext = createContext<MiniplayerContextType | undefined>(undefined);

export const MiniplayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const activateMiniplayer = (video: Video) => {
    setActiveVideo(video);
  };

  const deactivateMiniplayer = () => {
    setActiveVideo(null);
  };
  
  const isMiniplayerActive = activeVideo !== null;

  return (
    <MiniplayerContext.Provider value={{ activeVideo, isMiniplayerActive, activateMiniplayer, deactivateMiniplayer }}>
      {children}
    </MiniplayerContext.Provider>
  );
};

export const useMiniplayer = () => {
  const context = useContext(MiniplayerContext);
  if (context === undefined) {
    throw new Error('useMiniplayer must be used within a MiniplayerProvider');
  }
  return context;
};