
import React, { createContext, useState, useContext, ReactNode } from 'react';
// FIX: Corrected import path for types.
import { Video } from '../types';

interface UserDataContextType {
  watchHistory: Video[];
  watchLater: Video[];
  addToHistory: (video: Video) => void;
  addToWatchLater: (video: Video) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchHistory, setWatchHistory] = useState<Video[]>([]);
  const [watchLater, setWatchLater] = useState<Video[]>([]);

  const addToHistory = (video: Video) => {
    setWatchHistory(prev => [video, ...prev.filter(v => v.id !== video.id)]);
  };
  
  const addToWatchLater = (video: Video) => {
    setWatchLater(prev => {
        if (prev.find(v => v.id === video.id)) {
            return prev.filter(v => v.id !== video.id); // Toggle off
        }
        return [video, ...prev]; // Toggle on
    });
  };

  return (
    <UserDataContext.Provider value={{ watchHistory, watchLater, addToHistory, addToWatchLater }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};