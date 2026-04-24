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
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    flex: 1,
    cursor: 'pointer',
    userSelect: 'none',
  },
  brandAccent: { color: '#C4A96B' },
  flagBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    background: 'rgba(196,169,107,0.12)',
    border: '1px solid rgba(196,169,107,0.25)',
    borderRadius: '20px',
    padding: '2px 10px 2px 4px',
    fontSize: '0.72rem',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '0.04em',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    marginLeft: '0.5rem',
  },
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
        <span>
          Nehnuteľnosti<span style={styles.brandAccent}>.sk</span>
        </span>
        <span style={styles.flagBadge}>
          🇸🇰 Slovakia
        </span>
      </div>
      <div style={styles.actions}>
        {currentUser && (
          <span style={styles.userGreeting}>Hello, {currentUser.email}</span>
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
