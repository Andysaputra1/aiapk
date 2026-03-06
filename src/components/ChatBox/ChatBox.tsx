import React from 'react';
import './ChatBox.css';
import { LogViewer } from '../LogViewer/LogViewer';
import type { ChatBoxProps } from '../../types/workspaces';
import ReactMarkdown from 'react-markdown';

export const ChatBox: React.FC<ChatBoxProps> = ({ input, setInput, onSend, jawaban, logKode, loading, onClear}) => {
    return (
        <div className="chat-container">
            <div className="chat-history">
                <div className="chat-bubble bubble-ai">
                    <strong> Agent :</strong><br/>
                    {loading ? (
                        <span className="text-muted"><i className="fas fa-cog fa-spin me-2"></i> Sedang memproses data...</span>
                    ) : (
                        <ReactMarkdown>
                            {jawaban || "Sistem siap. Silakan unggah file dan ajukan pertanyaan."}
                        </ReactMarkdown>
                    )}
                    
                    {/* Tampilkan LogViewer jika ada kode */}
                    <LogViewer logCode={logKode} />
                </div>
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