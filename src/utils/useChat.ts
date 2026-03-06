import { useState, useEffect } from 'react';

// Hook ini menerima parameter 'files' dari luar agar bisa ikut dikirim ke API
export const useChat = (files: FileList | null) => {
    // 1. Ubah inisialisasi useState agar membaca dari localStorage (memori browser) terlebih dahulu
    const [pertanyaan, setPertanyaan] = useState(() => localStorage.getItem('last_pertanyaan') || '');
    const [jawaban, setJawaban] = useState(() => localStorage.getItem('last_jawaban') || '');
    const [logKode, setLogKode] = useState(() => localStorage.getItem('last_logKode') || '');
    
    const [isLoading, setIsLoading] = useState(false);

    // 2. Gunakan useEffect: Setiap kali jawaban/logKode berubah, otomatis simpan ke memori browser
    useEffect(() => {
        localStorage.setItem('last_pertanyaan', pertanyaan);
        localStorage.setItem('last_jawaban', jawaban);
        localStorage.setItem('last_logKode', logKode);
    }, [pertanyaan, jawaban, logKode]);

    const handleSendToAI = async () => {
        if (!files || files.length < 5) {
            alert("Harap unggah minimal 5 file CSV terlebih dahulu!");
            return;
        }
        if (!pertanyaan.trim()) {
            alert("Ketikkan pertanyaan Anda!");
            return;
        }

        setIsLoading(true);
        // Jangan reset pertanyaan di sini, supaya user masih bisa lihat apa yang dia ketik
        setJawaban('');
        setLogKode('');

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

    // 3. (Opsional) Fungsi untuk menghapus percakapan dari layar dan memori
    const clearChat = () => {
        if (window.confirm("Apakah Anda yakin ingin menghapus obrolan ini?")) {
            setPertanyaan('');
            setJawaban('');
            setLogKode('');
            localStorage.removeItem('last_pertanyaan');
            localStorage.removeItem('last_jawaban');
            localStorage.removeItem('last_logKode');
        }
    };

    return {
        pertanyaan,
        setPertanyaan,
        jawaban,
        logKode,
        isLoading,
        handleSendToAI,
        clearChat // Ekspor clearChat agar bisa dipasang di tombol "Hapus/Trash" nanti
    };
};