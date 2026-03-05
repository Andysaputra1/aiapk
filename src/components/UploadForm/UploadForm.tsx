import React from 'react';
import './UploadForm.css';
import {type UploadFormProps} from '../../types/workspaces'

// 2. Terima props tersebut di dalam komponen
export const UploadForm: React.FC<UploadFormProps> = ({ onFileChange, files }) => {
    
    // 3. Ubah FileList menjadi array agar bisa ditampilkan menggunakan .map()
    const fileArray = files ? Array.from(files) : [];

    return (
        <div className="upload-container">
            <h5 className="upload-title">
                <i className="fas fa-file-csv me-2"></i> Data Produksi
            </h5>
            <p className="text-muted upload-subtitle">
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
                <div className="file-detected-container">
                    <p className="file-detected-title">File Terdeteksi:</p>
                    <ul className="file-detected-list">
                        {fileArray.map((file, index) => (
                            <li key={index} className="file-detected-item">
                                <i className="fas fa-file-csv me-2 file-detected-icon"></i>
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!files && (
                <div className="file-list-req">
                    <strong>Wajib upload 5 file:</strong>
                    <ul>
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