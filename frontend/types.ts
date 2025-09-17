export type AppStatus = 'idle' | 'loading' | 'success' | 'error';
export type BackendStatus = 'checking' | 'online' | 'offline';

export interface ProcessResponse {
  transcript?: string;
  download_pdf?: string;
  download_docx?: string;
  error?: string;
}
