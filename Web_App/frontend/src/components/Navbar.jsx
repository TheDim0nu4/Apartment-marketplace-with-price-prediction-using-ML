import React from 'react';
import { useApp } from '../context/AppContext';

const styles = {
  nav: {
    background: '#1C1C1A',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.4rem',
    color: '#fff',
    flex: 1,
    cursor: 'pointer',
    userSelect: 'none',
  },
  brandAccent: { color: '#C4A96B' },
  actions: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  userGreeting: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
  },
  btnSell: {
    padding: '0.5rem 1.1rem',
    borderRadius: '6px',
    fontSize: '0.88rem',
    fontWeight: 500,
    border: 'none',
    background: '#C4A96B',
    color: '#1C1C1A',
    transition: 'background 0.2s',
  },
  btnLogout: {
    padding: '0.5rem 1.1rem',
    borderRadius: '6px',
    fontSize: '0.88rem',
    fontWeight: 500,
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.15)',
    transition: 'all 0.2s',
  },
};

export default function Navbar({ onHome, onSell }) {
  const { currentUser, logout } = useApp();

  return (
    <nav style={styles.nav}>
      <div style={styles.brand} onClick={onHome}>
        Estate<span style={styles.brandAccent}></span>
      </div>
      <div style={styles.actions}>
        {currentUser && (
          <span style={styles.userGreeting}>Hello, {currentUser}</span>
        )}
        <button
          style={styles.btnSell}
          onMouseEnter={e => e.target.style.background = '#B8963A'}
          onMouseLeave={e => e.target.style.background = '#C4A96B'}
          onClick={onSell}
        >
          + List Apartment
        </button>
        <button
          style={styles.btnLogout}
          onMouseEnter={e => { e.target.style.color='#fff'; e.target.style.borderColor='rgba(255,255,255,0.4)'; }}
          onMouseLeave={e => { e.target.style.color='rgba(255,255,255,0.6)'; e.target.style.borderColor='rgba(255,255,255,0.15)'; }}
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
