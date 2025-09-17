import React, { useState } from 'react';
import { API_BASE_URL } from '../constants';

interface TranscriptOutputProps {
  transcript: string;
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export const TranscriptOutput: React.FC<TranscriptOutputProps> = ({ transcript }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(transcript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">Transcription Result</h2>
      <div className="relative">
         <textarea
            readOnly
            value={transcript}
            className="w-full h-64 p-4 bg-gray-900 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Transcription text"
        />
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 bg-gray-700/50 hover:bg-gray-600 rounded-lg transition-colors"
            title={copied ? "Copied!" : "Copy to clipboard"}
        >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5 text-gray-300"/>}
        </button>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <h3 className="text-lg font-medium text-gray-300">Download as:</h3>
        <div className="flex gap-4">
            <a
                href={`${API_BASE_URL}/api/download/pdf`}
                download="transcript.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
                <DownloadIcon className="w-5 h-5"/>
                Download PDF
            </a>
            <a
                href={`${API_BASE_URL}/api/download/docx`}
                download="transcript.docx"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
                <DownloadIcon className="w-5 h-5"/>
                Download Word
            </a>
        </div>
      </div>
    </div>
  );
};