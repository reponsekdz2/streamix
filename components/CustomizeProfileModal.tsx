
import React from 'react';

interface CustomizeProfileModalProps {
  closeModal: () => void;
}

const CustomizeProfileModal: React.FC<CustomizeProfileModalProps> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-lg border border-zinc-700">
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h2 className="text-xl font-semibold text-white">Customize Channel</h2>
          <button onClick={closeModal} className="text-zinc-400 text-2xl leading-none hover:text-white">&times;</button>
        </div>
        <div className="p-6">
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Channel Name</label>
                    <input type="text" defaultValue="Jane Doe" className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-netflix-red" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Handle</label>
                    <input type="text" defaultValue="@janedoe" className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-netflix-red" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                    <textarea rows={4} className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-netflix-red" defaultValue="Welcome to my channel!"></textarea>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Profile Picture</label>
                    <input type="file" className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-700 file:text-white hover:file:bg-zinc-600"/>
                 </div>
            </div>
        </div>
        <div className="flex justify-end p-4 bg-zinc-800 border-t border-zinc-700 rounded-b-lg gap-2">
          <button onClick={closeModal} className="text-white bg-transparent hover:bg-zinc-700 font-semibold py-2 px-4 rounded-md">Cancel</button>
          <button onClick={closeModal} className="bg-netflix-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeProfileModal;
