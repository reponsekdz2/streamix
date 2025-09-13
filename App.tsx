
import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import TrendingPage from './pages/TrendingPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import HistoryPage from './pages/HistoryPage';
import WatchLaterPage from './pages/WatchLaterPage';
import DownloadsPage from './pages/DownloadsPage';
import PremiumPage from './pages/PremiumPage';
import SettingsPage from './pages/SettingsPage';
import PlaylistPage from './pages/PlaylistPage';
import LivePage from './pages/LivePage';
import ShortsPage from './pages/ShortsPage';

// Creator Studio Pages
import StudioLayout from './pages/studio/StudioLayout';
import DashboardPage from './pages/studio/DashboardPage';
import ContentPage from './pages/studio/ContentPage';
import AnalyticsPage from './pages/studio/AnalyticsPage';
import CommentsPage from './pages/studio/CommentsPage';

import { AuthProvider } from './contexts/AuthContext';
import { UserDataProvider } from './contexts/UserDataContext';
import { MiniplayerProvider } from './contexts/MiniplayerContext';
import Miniplayer from './components/Miniplayer';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

const AppLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (
        <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            <div className="bg-netflix-dark text-white min-h-screen">
                <Header />
                <div className="flex pt-16">
                    <Sidebar />
                    <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                        <Outlet />
                    </main>
                </div>
                <Miniplayer />
            </div>
        </AppContext.Provider>
    );
};


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserDataProvider>
            <MiniplayerProvider>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/watch/:id" element={<WatchPage />} />
                        <Route path="/results" element={<SearchResultsPage />} />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/profile/:username" element={<ProfilePage />} />
                        <Route path="/trending" element={<TrendingPage />} />
                        <Route path="/subscriptions" element={<SubscriptionsPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/watch-later" element={<WatchLaterPage />} />
                        <Route path="/downloads" element={<DownloadsPage />} />
                        <Route path="/premium" element={<PremiumPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/playlist/:id" element={<PlaylistPage />} />
                        <Route path="/live" element={<LivePage />} />
                        
                        {/* Creator Studio Nested Routes */}
                        <Route path="/studio" element={<StudioLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="content" element={<ContentPage />} />
                            <Route path="analytics" element={<AnalyticsPage />} />
                            <Route path="comments" element={<CommentsPage />} />
                        </Route>
                    </Route>
                    
                    {/* Full-page routes without the main layout */}
                    <Route path="/shorts" element={<ShortsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </MiniplayerProvider>
        </UserDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
