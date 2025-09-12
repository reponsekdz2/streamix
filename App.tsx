
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchResultsPage from './pages/SearchResultsPage';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrendingPage from './pages/TrendingPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import HistoryPage from './pages/HistoryPage';
import WatchLaterPage from './pages/WatchLaterPage';
import DownloadsPage from './pages/DownloadsPage';
import MonetizationPage from './pages/MonetizationPage';
import SettingsPage from './pages/SettingsPage';
import PremiumPage from './pages/PremiumPage';
import ProfilePage from './pages/ProfilePage';
import { UserDataProvider } from './contexts/UserDataContext';
import UploadPage from './pages/UploadPage';

interface AppContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

const AppContent: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Pages that should not have the main layout (header/sidebar)
    const noLayoutRoutes = ['/login', '/register'];
    const showLayout = !noLayoutRoutes.includes(location.pathname);

    return (
        <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            <div className="bg-netflix-dark min-h-screen text-white">
                {showLayout && <Header />}
                <div className="flex">
                    {showLayout && <Sidebar />}
                    <main className={`flex-1 transition-all duration-300 ${showLayout ? (isSidebarOpen ? 'ml-60' : 'ml-20') : ''} mt-16 p-6`}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/watch/:id" element={<WatchPage />} />
                            <Route path="/results" element={<SearchResultsPage />} />
                            <Route path="/trending" element={<TrendingPage />} />
                            <Route path="/subscriptions" element={<SubscriptionsPage />} />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route path="/watch-later" element={<WatchLaterPage />} />
                            <Route path="/downloads" element={<DownloadsPage />} />
                            <Route path="/monetization" element={<MonetizationPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/premium" element={<PremiumPage />} />
                            <Route path="/profile/:username" element={<ProfilePage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            
                            {/* These routes are outside the main layout */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </AppContext.Provider>
    );
};


const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <UserDataProvider>
                    <AppContent />
                </UserDataProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
