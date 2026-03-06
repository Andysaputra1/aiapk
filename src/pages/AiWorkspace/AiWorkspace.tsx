import React from 'react';
import './AiWorkspace.css';

import { UploadForm } from '../../components/UploadForm/UploadForm';
import { ChatBox } from '../../components/ChatBox/ChatBox';

import { useFileUpload } from '../../utils/useFileUpload';
import { useChat } from '../../utils/useChat';

export const AiWorkspace: React.FC = () => {
    
    // Panggil logika dari utils
    const { files, handleFileChange } = useFileUpload();
    const { 
        pertanyaan, 
        setPertanyaan, 
        messages, // <--- 1. UBAH INI: Ganti jawaban & logKode menjadi messages
        isLoading, 
        handleSendToAI,
        clearChat 
    } = useChat(files); // Lempar files ke useChat agar bisa divalidasi dan dikirim ke API

    return (
        <main className="main-content">
            <div className="workspace-container">
                <div className="workspace-header">
                    <h2 className="workspace-title">AI Workspace</h2>
                    <p className="workspace-subtitle">
                        Sistem Optimasi Produksi Berbasis Agentic AI
                    </p>
                </div>

                <div className="workspace-content">
                    {/* Kirim fungsi setFiles agar bisa dipakai UploadForm */}
                    <div className="workspace-left">
                        <UploadForm 
                        files={files} 
                        onFileChange={handleFileChange}
                    />
                    </div>

                    {/* Kirim state dan fungsi handle ke ChatBox */}
                    <div className="workspace-right">
                        <ChatBox 
                            input={pertanyaan}
                            setInput={setPertanyaan}
                            onSend={handleSendToAI}
                            messages={messages} // <--- 2. UBAH INI: Kirim messages ke ChatBox
                            loading={isLoading}
                            onClear={clearChat}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};