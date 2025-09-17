import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { URLInputForm } from './components/URLInputForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { TranscriptOutput } from './components/TranscriptOutput';
import { API_BASE_URL } from './constants';
import type { AppStatus, ProcessResponse, BackendStatus } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [status, setStatus] = useState<AppStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/status`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'backend running') {
            setBackendStatus('online');
            return;
          }
        }
        setBackendStatus('offline');
      } catch (err) {
        setBackendStatus('offline');
      }
    };
    checkBackendStatus();
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    if (status === 'loading') {
      timer = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            if (timer) clearInterval(timer);
            return 95;
          }
          const increment = Math.random() * 5;
          return Math.min(prev + increment, 95);
        });
      }, 500);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status]);


  const handleTranscribe = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a valid YouTube URL.');
      setStatus('error');
      return;
    }
    
    if (backendStatus === 'offline') {
      setError('Cannot start transcription. The backend server is offline. Please start your server and refresh the page.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);
    setTranscript('');
    setProgress(0);

    try {
      const response = await fetch(`${API_BASE_URL}/api/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data: ProcessResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred.');
      }

      if (!data.transcript || data.transcript.trim() === '') {
        throw new Error('The transcription returned an empty result.');
      }

      setProgress(100);
      setTimeout(() => {
          setTranscript(data.transcript);
          setStatus('success');
      }, 500); 
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      let detailedError = `Transcription failed: ${errorMessage}`;
      
      if (errorMessage.toLowerCase().includes('failed to fetch')) {
        setBackendStatus('offline');
        detailedError = `Could not connect to the backend server. The status indicator is now showing 'Offline'.\n\nPlease ensure:\n1. The Python backend server is running.\n2. There are no network issues blocking access to ${API_BASE_URL}.`;
      } else {
        detailedError += '\nPlease check the backend server logs for more details.'
      }
      
      setProgress(100);
      setTimeout(() => {
        setError(detailedError);
        setStatus('error');
      }, 500); 
    }
  }, [url, backendStatus]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header backendStatus={backendStatus} />
        <main className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
          <URLInputForm
            url={url}
            setUrl={setUrl}
            onSubmit={handleTranscribe}
            isLoading={status === 'loading'}
            isBackendOnline={backendStatus === 'online'}
          />

          <div className="mt-8 min-h-[200px] flex items-center justify-center">
            {status === 'loading' && <LoadingSpinner progress={progress} />}
            {status === 'error' && error && <ErrorMessage message={error} />}
            {status === 'success' && transcript && <TranscriptOutput transcript={transcript} />}
            {status === 'idle' && (
              <div className="text-center text-gray-400">
                <p>Your transcribed text will appear here.</p>
              </div>
            )}
          </div>
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>YouTube Transcriber UI</p>
          <p>Powered by React, Tailwind CSS, and AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
