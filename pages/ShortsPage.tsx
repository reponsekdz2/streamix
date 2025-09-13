
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { Video } from '../types';
import ShortsPlayer from '../components/ShortsPlayer';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const ShortsPage: React.FC = () => {
    const [shorts, setShorts] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeShortId, setActiveShortId] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const fetchShorts = async () => {
            setIsLoading(true);
            try {
                const data = await apiService.get<Video[]>('/shorts');
                setShorts(data);
                if (data.length > 0) {
                    setActiveShortId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch shorts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchShorts();
    }, []);

    const activeShortRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const shortId = entries[0].target.getAttribute('data-short-id');
                setActiveShortId(shortId);
            }
        }, { threshold: 0.7 });

        if (node) {
            const children = node.children;
            for (let i = 0; i < children.length; i++) {
                observer.current.observe(children[i]);
            }
        }
    }, [isLoading]);

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center relative">
            <Link to="/" className="absolute top-4 left-4 z-20 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </Link>
             <div className="absolute top-5 text-2xl font-bold text-white tracking-wider">
                STREAMIX <span className="text-netflix-red">SHORTS</span>
            </div>
            {isLoading ? <Spinner/> : (
                <div ref={activeShortRef} className="h-full max-h-[90vh] md:max-h-[85vh] w-full md:w-auto aspect-[9/16] max-w-[450px] bg-black rounded-lg relative snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
                    {shorts.map(short => (
                        <div key={short.id} data-short-id={short.id} className="snap-center h-full w-full flex-shrink-0">
                            <ShortsPlayer short={short} isVisible={activeShortId === short.id} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShortsPage;
