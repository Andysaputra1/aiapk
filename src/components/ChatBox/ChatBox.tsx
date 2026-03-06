import React, { useEffect, useRef } from 'react';
import './ChatBox.css';
import { LogViewer } from '../LogViewer/LogViewer';
import type { ChatBoxProps } from '../../types/workspaces';
import ReactMarkdown from 'react-markdown';

export const ChatBox: React.FC<ChatBoxProps> = ({ input, setInput, onSend, messages, loading, onClear }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fungsi agar otomatis scroll ke paling bawah setiap ada pesan baru
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    return (
        <div className="chat-container">
            <div className="chat-history">
                {/* 1. Jika tidak ada pesan, tampilkan pesan selamat datang */}
                {messages.length === 0 && !loading && (
                    <div className="chat-empty">
                        Sistem siap. Silakan unggah file dan ajukan pertanyaan.
                    </div>
                )}

                {/* 2. LOOPING: Tampilkan semua pesan dari riwayat */}
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-bubble bubble-${msg.sender}`}>
                        <strong>{msg.sender === 'user' ? 'Anda' : 'Agent'} :</strong><br/>
                        <ReactMarkdown>
                            {msg.text}
                        </ReactMarkdown>
                        
                        {/* Tampilkan LogViewer hanya di pesan AI yang memiliki kode */}
                        {msg.sender === 'ai' && msg.logCode && (
                            <LogViewer logCode={msg.logCode} />
                        )}
                    </div>
                ))}

                {/* 3. Tampilkan bubble loading jika sedang menunggu jawaban AI */}
                {loading && (
                    <div className="chat-bubble bubble-ai">
                        <strong> Agent :</strong><br/>
                        <span className="text-muted">
                            <i className="fas fa-cog fa-spin me-2"></i> Sedang memproses data...
                        </span>
                    </div>
                )}

                {/* 4. Elemen bantu untuk target scroll otomatis */}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <input 
                    type="text" 
                    className="chat-input" 
                    placeholder="Contoh: Hitung profit maksimal bulan ini..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    onKeyDown={(e) => e.key === 'Enter' && !loading && onSend()}
                />
                <button className="chat-send-btn" onClick={onSend} disabled={loading}>
                    <i className={loading ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"}></i>
                </button>

                <button 
                    className="chat-send-btn" 
                    onClick={onClear} 
                    disabled={loading}
                    title="Hapus Obrolan"
                    style={{ backgroundColor: '#dc3545', marginLeft: '8px' }}
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};