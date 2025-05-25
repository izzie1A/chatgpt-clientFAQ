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
          onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
          onMouseOut={(e) => e.target.style.color = isActive('/') ? styles.activeLink.color : styles.navLink.color}
        >
          Home
        </Link>
        <Link 
          to="/faq" 
          style={{
            ...styles.navLink,
            ...(isActive('/faq') && styles.activeLink)
          }}
          onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
          onMouseOut={(e) => e.target.style.color = isActive('/faq') ? styles.activeLink.color : styles.navLink.color}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#2c3e50',
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    background: 'linear-gradient(90deg, #4a6fa5, #5e9ce0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#6c757d',
    fontWeight: '500',
    padding: '0.5rem 0',
    position: 'relative',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
  },
  activeLink: {
    color: '#4a6fa5',
    fontWeight: '600',
  },
  navLinkHover: {
    color: '#4a6fa5',
  }
};

export default Navbar;
