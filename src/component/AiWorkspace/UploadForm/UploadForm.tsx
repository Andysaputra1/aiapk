import React from 'react';
import './UploadForm.css';

interface UploadFormProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onFileChange }) => {
    return (
        <div className="upload-container">
            <h5 className="fw-bold"><i className="fas fa-file-csv me-2"></i> Data Produksi</h5>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Unggah 5 file CSV (BOM, FG, SFG, Compo, Stock).</p>

            <label className="upload-box">
                <i className="fas fa-cloud-upload-alt upload-icon"></i>
                <div className="upload-text">Klik untuk pilih file</div>
                <input 
                    type="file" 
                    multiple 
                    accept=".csv" 
                    className="upload-input" 
                    onChange={onFileChange} // Menghubungkan ke state di parent
                />
            </label>
        </div>
    );
};