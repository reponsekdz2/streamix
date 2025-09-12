
import React, { useState, createContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';
import PremiumPage from './pages/PremiumPage';
import DownloadsPage from './pages/DownloadsPage';
import MonetizationPage from './pages/MonetizationPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

// Placeholder component for unimplemented pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-full pt-20">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-zinc-400 mt-4">This page is under construction. Check back soon!</p>
    </div>
);

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
     <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        <div className="bg-netflix-dark text-white min-h-screen font-sans">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'}`}>
              <div className="p-4 sm:p-6 lg:p-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
    </AppContext.Provider>
  )
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/trending" element={<PlaceholderPage title="Trending" />} />
            <Route path="/subscriptions" element={<PlaceholderPage title="Subscriptions" />} />
            <Route path="/history" element={<PlaceholderPage title="History" />} />
            <Route path="/watch-later" element={<PlaceholderPage title="Watch Later" />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/results" element={<SearchResultsPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/monetization" element={<MonetizationPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
