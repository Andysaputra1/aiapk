import React from 'react';

export interface Message {
    sender: 'user' | 'ai';
    text: string;
    logCode?: string;
}

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
    messages: Message[]
    loading: boolean;
    onClear: ()=> void;
}

// Props untuk LogViewer
export interface LogViewerProps {
    logCode: string;
}