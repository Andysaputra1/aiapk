import React, { useState } from 'react';
import './LogViewer.css';

// Kita siapkan 'props' agar komponen ini bisa menerima data kode dari luar
interface LogViewerProps {
    logCode: string;
}

export const LogViewer: React.FC<LogViewerProps> = ({ logCode }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Kalau tidak ada kode, jangan tampilkan apa-apa
    if (!logCode) return null;

    return (
        <div className="log-viewer-container">
            <div className="log-viewer-header" onClick={() => setIsOpen(!isOpen)}>
                <span><i className="fas fa-terminal me-2"></i> Lihat Log Kode Python</span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
            </div>
            
            {isOpen && (
                <pre className="log-viewer-content">
                    <code>{logCode}</code>
                </pre>
            )}
        </div>
    );
}