import React, { useState } from 'react';
import './AiWorkspace.css';
import { UploadForm } from './UploadForm/UploadForm';
import { ChatBox } from './ChatBox/ChatBox';

export const AiWorkspace: React.FC = () => {
    // --- STATE UTAMA ---
    const [files, setFiles] = useState<FileList | null>(null);
    const [pertanyaan, setPertanyaan] = useState('');
    const [jawaban, setJawaban] = useState('');
    const [logKode, setLogKode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // --- FUNGSI KIRIM KE API ---
    const handleSendToAI = async () => {
        // Validasi awal
        if (!files || files.length < 5) {
            alert("Harap unggah minimal 5 file CSV terlebih dahulu!");
            return;
        }
        if (!pertanyaan.trim()) {
            alert("Ketikkan pertanyaan Anda!");
            return;
        }

        setIsLoading(true);
        setJawaban(''); // Reset jawaban sebelumnya
        setLogKode('');

        // Bungkus data ke FormData (sama seperti saat tes di Postman)
        const formData = new FormData();
        formData.append("pertanyaan", pertanyaan);
        
        for (let i = 0; i < files.length; i++) {
            formData.append("files_csv", files[i]);
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.status === "success") {
                setJawaban(data.jawaban);
                setLogKode(data.log_kode);
            } else {
                setJawaban("Maaf, terjadi kesalahan pada pemrosesan AI.");
            }
        } catch (error) {
            console.error("Error API:", error);
            setJawaban("Gagal terhubung ke server. Pastikan Backend (FastAPI) sudah menyala.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="main-content">
            <div className="workspace-container">
                <div className="workspace-header">
                    <h2 className="workspace-title">SCM AI Workspace</h2>
                    <p className="workspace-subtitle">
                        Sistem Optimasi Produksi Berbasis Agentic AI
                    </p>
                </div>

                <div className="workspace-content">
                    {/* Kirim fungsi setFiles agar bisa dipakai UploadForm */}
                    <div className="workspace-left">
                        <UploadForm onFileChange={(e) => setFiles(e.target.files)} />
                    </div>

                    {/* Kirim state dan fungsi handle ke ChatBox */}
                    <div className="workspace-right">
                        <ChatBox 
                            input={pertanyaan}
                            setInput={setPertanyaan}
                            onSend={handleSendToAI}
                            jawaban={jawaban}
                            logKode={logKode}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};