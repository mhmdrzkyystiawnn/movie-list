import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/trending', label: 'Trending' },
        { path: '/tvshows', label: 'TV Shows' }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo/Brand */}
                <Link to="/" className="navbar-brand">
                    <span className="brand-text">MovieHub</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="navbar-menu">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link 
                                to={link.path} 
                                className={isActive(link.path) ? 'nav-link active' : 'nav-link'}
                            >
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <button 
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    <Link 
                        key={link.path}
                        to={link.path} 
                        className={isActive(link.path) ? 'mobile-nav-link active' : 'mobile-nav-link'}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;