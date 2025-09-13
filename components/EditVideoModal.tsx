
import React, { useState } from 'react';
import { Video } from '../types';
import { apiService } from '../services/apiService';
import Spinner from './Spinner';

interface EditVideoModalProps {
    video: Video;
    closeModal: () => void;
    onVideoUpdate: (video: Video) => void;
}

const EditVideoModal: React.FC<EditVideoModalProps> = ({ video, closeModal, onVideoUpdate }) => {
    const [formData, setFormData] = useState({
        title: video.title,
        description: video.description,
        privacy: video.privacy,
        tags: video.tags.join(', '),
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');
        try {
            const updatedVideo = await apiService.put<Video>(`/studio/videos/${video.id}`, {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            });
            onVideoUpdate(updatedVideo);
            closeModal();
        } catch (err: any) {
            setError(err.message || 'Failed to update video.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-2xl border border-zinc-700">
                <div className="flex items-center justify-between p-4 border-b border-zinc-700">
                    <h2 className="text-lg font-semibold text-white">Edit Video</h2>
                    <button onClick={closeModal} className="text-zinc-400 text-2xl leading-none hover:text-white">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Privacy</label>
                            <select name="privacy" value={formData.privacy} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white">
                                <option value="public">Public</option>
                                <option value="unlisted">Unlisted</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Tags (comma-separated)</label>
                            <input name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white"/>
                        </div>
                         {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <div className="flex justify-end p-4 bg-zinc-800 border-t border-zinc-700 rounded-b-lg gap-3">
                        <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md hover:bg-zinc-700 font-semibold">Cancel</button>
                        <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-md bg-netflix-red hover:bg-red-700 font-semibold w-24 flex justify-center">
                            {isSaving ? <Spinner/> : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVideoModal;
