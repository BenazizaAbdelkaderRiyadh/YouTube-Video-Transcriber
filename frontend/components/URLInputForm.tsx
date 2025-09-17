import React from 'react';

interface URLInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isBackendOnline: boolean;
}

export const URLInputForm: React.FC<URLInputFormProps> = ({ url, setUrl, onSubmit, isLoading, isBackendOnline }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  
  const isDisabled = isLoading || !isBackendOnline;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-300 mb-2">
        YouTube Video URL
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="youtube-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          disabled={isDisabled}
          className="flex-grow w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 text-white placeholder-gray-500 disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={isDisabled}
          className="px-6 py-3 font-semibold text-white bg-brand-primary rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transcribing...
            </>
          ) : (
            'Transcribe Video'
          )}
        </button>
      </div>
      {!isBackendOnline && !isLoading && (
        <p className="text-red-400 text-sm mt-2 text-center sm:text-left">
          Cannot transcribe because the backend server is offline.
        </p>
      )}
    </form>
  );
};