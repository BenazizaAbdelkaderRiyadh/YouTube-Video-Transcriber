import React from 'react';
import type { BackendStatus } from '../types';

const YouTubeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.582,6.186 C21.325,5.323 20.688,4.686 19.825,4.429 C18.1,4 12,4 12,4 C12,4 5.9,4 4.175,4.429 C3.312,4.686 2.675,5.323 2.418,6.186 C2,7.9 2,12 2,12 C2,12 2,16.1 2.418,17.814 C2.675,18.677 3.312,19.314 4.175,19.571 C5.9,20 12,20 12,20 C12,20 18.1,20 19.825,19.571 C20.688,19.314 21.325,18.677 21.582,17.814 C22,16.1 22,12 22,12 C22,12 22,7.9 21.582,6.186 Z M10,15.464 L10,8.536 L16,12 L10,15.464 Z" />
    </svg>
);

interface StatusIndicatorProps {
  status: BackendStatus;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const statusConfig = {
    online: { text: 'Backend Online', color: 'bg-green-500' },
    offline: { text: 'Backend Offline', color: 'bg-red-500' },
    checking: { text: 'Checking Connection...', color: 'bg-yellow-500' },
  };

  const { text, color } = statusConfig[status];

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-sm text-gray-400">{text}</span>
    </div>
  );
};


interface HeaderProps {
    backendStatus: BackendStatus;
}

export const Header: React.FC<HeaderProps> = ({ backendStatus }) => {
  return (
    <header className="text-center">
        <div className="flex justify-center items-center gap-4">
            <YouTubeIcon />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                YouTube Video Transcriber
            </h1>
        </div>
        <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">
            Paste a YouTube video link below to get its full transcript instantly.
        </p>
        <StatusIndicator status={backendStatus} />
    </header>
  );
};