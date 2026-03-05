import React from 'react';

// Props untuk UploadForm
export interface UploadFormProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    files: FileList | null;
}

// Props untuk ChatBox
export interface ChatBoxProps {
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    jawaban: string;
    logKode: string;
    loading: boolean;
}

// Props untuk LogViewer
export interface LogViewerProps {
    logCode: string;
}