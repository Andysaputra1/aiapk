import React from "react";
import './Navbar.css';

export const Navbar: React.FC = () => {
    return (
        <nav className="navbar-container">
            {/* Kiri: Logo & Judul */}
            <div className="navbar-left">
                <img 
                    src="/image/polytron_logo_red.svg" 
                    alt="Polytron Logo" 
                    className="navbar-logo"
                />
                <span className="navbar-title">AI Optimizer</span>
            </div>

            {/* Kanan: Icon User */}
            <div className="navbar-right">
                <i className="fas fa-user-circle navbar-user-icon" title="Profil User"></i>
            </div>
        </nav>
    );
}