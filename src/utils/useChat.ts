import { useState } from 'react';

// Hook ini menerima parameter 'files' dari luar agar bisa ikut dikirim ke API
export const useChat = (files: FileList | null) => {
    const [pertanyaan, setPertanyaan] = useState('');
    const [jawaban, setJawaban] = useState('');
    const [logKode, setLogKode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    return {
        pertanyaan,
        setPertanyaan,
        jawaban,
        logKode,
        isLoading,
        handleSendToAI
    };
};