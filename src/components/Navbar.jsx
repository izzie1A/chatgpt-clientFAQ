import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          <span style={styles.logoText}>ChatGPT</span>
        </Link>
      </div>
      <div style={styles.navLinks}>
        <Link 
          to="/" 
          style={{
            ...styles.navLink,
            ...(isActive('/') && styles.activeLink)
          }}
        >
          Home
        </Link>
        <Link 
          to="/faq" 
          style={{
            ...styles.navLink,
            ...(isActive('/faq') && styles.activeLink)
          }}
        >
          FAQ
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#2c3e50',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '280px',
    zIndex: 1000,
    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    padding: '0 0 1rem 0',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoText: {
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700',
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  navLink: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    padding: '0.8rem 1rem',
    width: '100%',
    display: 'block',
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    fontSize: '1.1rem',
    textAlign: 'left',
    border: '1px solid transparent',
    backdropFilter: 'blur(4px)',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  activeLink: {
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  navLinkHover: {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }
};

export default Navbar;
