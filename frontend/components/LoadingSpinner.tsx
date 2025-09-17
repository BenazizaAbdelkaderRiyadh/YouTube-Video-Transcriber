import React from 'react';

interface LoadingSpinnerProps {
  progress: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ progress }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center text-gray-300">
      <svg className="animate-spin h-10 w-10 text-brand-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h3 className="text-lg font-semibold text-white">Processing Video</h3>
      <p className="mt-1 mb-4">This may take a few moments depending on the video length...</p>
      
      <div className="w-full max-w-sm bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-brand-primary h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};