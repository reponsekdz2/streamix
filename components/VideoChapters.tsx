
import React from 'react';
import { VideoChapter } from '../types';

interface VideoChaptersProps {
    chapters: VideoChapter[];
    onChapterClick?: (timeInSeconds: number) => void;
}

const parseTimestamp = (timestamp: string): number => {
    const parts = timestamp.split(':').map(Number).reverse();
    let seconds = 0;
    if (parts.length > 0) seconds += parts[0]; // seconds
    if (parts.length > 1) seconds += parts[1] * 60; // minutes
    if (parts.length > 2) seconds += parts[2] * 3600; // hours
    return seconds;
}


const VideoChapters: React.FC<VideoChaptersProps> = ({ chapters, onChapterClick }) => {
    if (!chapters || chapters.length === 0) return null;
    
    return (
        <div className="mt-4">
            <h3 className="font-bold mb-2 text-white">Chapters</h3>
            <ul className="space-y-1">
                {chapters.map((chapter, index) => (
                    <li 
                        key={index}
                        onClick={() => onChapterClick && onChapterClick(parseTimestamp(chapter.timestamp))}
                        className="flex items-center gap-3 text-sm text-zinc-300 hover:bg-zinc-800 p-2 rounded cursor-pointer"
                    >
                        <span className="font-semibold text-netflix-red w-16 text-right">{chapter.timestamp}</span>
                        <span>{chapter.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoChapters;
