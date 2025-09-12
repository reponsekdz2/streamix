
import React from 'react';

const UploadPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-8">Upload Video</h1>
            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-12 flex flex-col items-center justify-center">
                <svg className="mx-auto h-12 w-12 text-zinc-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 className="mt-2 text-xl font-semibold text-white">Select video files to upload</h2>
                <p className="mt-1 text-sm text-zinc-400">Or drag and drop video files</p>
                <div className="mt-6">
                    <button type="button" className="bg-netflix-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                        Select Files
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
