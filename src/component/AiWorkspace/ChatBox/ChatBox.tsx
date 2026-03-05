import React from 'react';
import './ChatBox.css';
import { LogViewer } from '../LogViewer/LogViewer';

interface ChatBoxProps {
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    jawaban: string;
    logKode: string;
    loading: boolean;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ input, setInput, onSend, jawaban, logKode, loading }) => {
    return (
        <div className="chat-container">
            <div className="chat-history">
                <div className="chat-bubble bubble-ai">
                    <strong>🤖 Agent SCM:</strong><br/>
                    {loading ? (
                        <span className="text-muted"><i className="fas fa-cog fa-spin me-2"></i> Sedang memproses data...</span>
                    ) : (
                        jawaban || "Sistem siap. Silakan unggah file dan ajukan pertanyaan."
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
                />
                <button className="chat-send-btn" onClick={onSend} disabled={loading}>
                    <i className={loading ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"}></i>
                </button>
            </div>
        </div>
    );
};