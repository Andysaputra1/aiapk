import React from 'react';
import './UploadForm.css';

// 1. Tambahkan Interface Props agar bisa menerima data 'files' dan fungsi 'onFileChange' dari AiWorkspace
interface UploadFormProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    files: FileList | null; 
}

// 2. Terima props tersebut di dalam komponen
export const UploadForm: React.FC<UploadFormProps> = ({ onFileChange, files }) => {
    
    // 3. Ubah FileList menjadi array agar bisa ditampilkan menggunakan .map()
    const fileArray = files ? Array.from(files) : [];

    return (
        <div className="upload-container">
            <h5 style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '0' }}>
                <i className="fas fa-file-csv me-2"></i> Data Produksi
            </h5>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Silakan unggah 5 file CSV yang dibutuhkan.
            </p>

            {/* 4. Berikan feedback visual pada box jika file sudah ada */}
            <label className={`upload-box ${files ? 'active' : ''}`}>
                <i className={`fas ${files ? 'fa-check-circle' : 'fa-cloud-upload-alt'} upload-icon`}></i>
                <div className="upload-text">
                    {files ? `${files.length} File Berhasil Dipilih` : 'Klik atau Drag & Drop file CSV di sini'}
                </div>
                {!files && <span className="upload-btn-custom">Pilih File</span>}
                
                {/* 5. Hubungkan input dengan fungsi onFileChange dari parent */}
                <input 
                    type="file" 
                    multiple 
                    accept=".csv" 
                    className="upload-input" 
                    onChange={onFileChange} 
                />
            </label>

            {/* 6. TAMPILKAN DAFTAR NAMA FILE DI SINI */}
            {fileArray.length > 0 && (
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>File Terdeteksi:</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {fileArray.map((file, index) => (
                            <li key={index} style={{ fontSize: '0.75rem', color: '#2c3e50', marginBottom: '3px', display: 'flex', alignItems: 'center' }}>
                                <i className="fas fa-file-csv me-2" style={{ color: '#e4002b' }}></i>
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!files && (
                <div className="file-list-req">
                    <strong>Wajib upload 5 file:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                        <li><code>fg.csv</code> (Barang Jadi)</li>
                        <li><code>sfg.csv</code> (Barang Setengah Jadi)</li>
                        <li><code>compo.csv</code> (Komponen Dasar)</li>
                        <li><code>std_use.csv</code> (BOM / Resep)</li>
                        <li><code>stock.csv</code> (Stok Gudang)</li>
                    </ul>
                </div>
            )}
        </div>
    );
}