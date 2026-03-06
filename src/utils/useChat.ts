import { useState, useEffect } from 'react';
import type { Message } from '../types/workspaces';


export const useChat = (files: FileList | null) => {
    const [pertanyaan, setPertanyaan] = useState('');
    
    // 1. GANTI jawaban & logKode tunggal menjadi array messages
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('chat_history');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [isLoading, setIsLoading] = useState(false);

    // 2. Simpan seluruh array messages ke localStorage setiap kali ada perubahan
    useEffect(() => {
        localStorage.setItem('chat_history', JSON.stringify(messages));
    }, [messages]);

    const handleSendToAI = async () => {
        if (!files || files.length < 5) {
            alert("Harap unggah minimal 5 file CSV terlebih dahulu!");
            return;
        }
        if (!pertanyaan.trim()) {
            alert("Ketikkan pertanyaan Anda!");
            return;
        }

        const userQuery = pertanyaan;
        setPertanyaan(''); // Kosongkan inputField segera setelah kirim
        setIsLoading(true);

        // 3. Tambahkan pertanyaan user ke dalam daftar pesan (UI langsung update)
        const userMessage: Message = { sender: 'user', text: userQuery };
        setMessages(prev => [...prev, userMessage]);

        const formData = new FormData();
        formData.append("pertanyaan", userQuery);
        
        for (let i = 0; i < files.length; i++) {
            formData.append("files_csv", files[i]);
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.status === "success") {
                // 4. Tambahkan jawaban AI dan log kodenya ke dalam daftar pesan
                const aiMessage: Message = { 
                    sender: 'ai', 
                    text: data.jawaban, 
                    logCode: data.log_kode 
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                setMessages(prev => [...prev, { sender: 'ai', text: "Maaf, terjadi kesalahan pada pemrosesan AI." }]);
            }
        } catch (error) {
            console.error("Error API:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: "Gagal terhubung ke server. Pastikan Backend menyala." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // 5. Update fungsi clearChat untuk menghapus seluruh array history
    const clearChat = () => {
        if (window.confirm("Apakah Anda yakin ingin menghapus seluruh riwayat obrolan?")) {
            setPertanyaan('');
            setMessages([]);
            localStorage.removeItem('chat_history');
        }
    };

    return {
        pertanyaan,
        setPertanyaan,
        messages, // <--- Kembalikan messages (array), bukan lagi jawaban/logKode tunggal
        isLoading,
        handleSendToAI,
        clearChat
    };
};