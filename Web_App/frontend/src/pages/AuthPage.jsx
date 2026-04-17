import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const s = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  left: {
    background: '#1C1C1A',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3rem',
    position: 'relative',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    border: '1px solid rgba(196,169,107,0.2)',
    top: '-100px',
    left: '-100px',
    pointerEvents: 'none',
  },
  circle2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: '1px solid rgba(196,169,107,0.15)',
    bottom: '-50px',
    right: '-50px',
    pointerEvents: 'none',
  },
  brand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.8rem',
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: '1rem',
    position: 'relative',
    zIndex: 1,
  },
  tagline: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '1rem',
    fontWeight: 300,
    position: 'relative',
    zIndex: 1,
  },
  statsRow: {
    display: 'flex',
    gap: '2rem',
    marginTop: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#C4A96B',
  },
  statLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    background: '#F7F4EE',
  },
  formBox: { width: '100%', maxWidth: '380px' },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #E2DDD4',
    marginBottom: '2rem',
  },
  tab: (active) => ({
    flex: 1,
    padding: '0.75rem',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid #C4A96B' : '2px solid transparent',
    marginBottom: '-1px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    fontWeight: active ? 500 : 400,
    color: active ? '#1C1C1A' : '#6B6860',
    cursor: 'pointer',
  }),
  formGroup: { marginBottom: '1.2rem' },
  label: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: '#6B6860',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.5rem',
  },
  btnPrimary: {
    width: '100%',
    padding: '0.9rem',
    background: '#1C1C1A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  error: {
    background: '#FCEBEB',
    border: '1px solid #F09595',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#A32D2D',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
};

export default function AuthPage() {
  const { login, register } = useApp();

  const [tab, setTab] = useState('login');
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPass2, setRegPass2] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!loginEmail) {
      setError('Please enter your email.');
      return;
    }

    if (!loginPass) {
      setError('Please enter your password.');
      return;
    }

    try {
      await login(loginEmail, loginPass);
    } catch {
      setError('Invalid credentials');
    }
  };

  const handleRegister = async () => {
    setError('');

    if (!regEmail) {
      setError('Please enter your email.');
      return;
    }

    if (regPass.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (regPass !== regPass2) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register(regEmail, regPass);
      setTab('login');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div style={s.page}>
      <div style={s.left}>
        <div style={s.circle1} />
        <div style={s.circle2} />
        <div style={s.brand}>
          Find Your<br /><span style={{ color: '#C4A96B' }}>Dream Home</span>
        </div>
        <p style={s.tagline}>
          Browse apartments for sale or list your own — fast and simple.
        </p>
      </div>

      <div style={s.right}>
        <div style={s.formBox}>
          <div style={s.tabs}>
            <button
              style={s.tab(tab === 'login')}
              onClick={() => { setTab('login'); setError(''); }}
            >
              Log In
            </button>

            <button
              style={s.tab(tab === 'register')}
              onClick={() => { setTab('register'); setError(''); }}
            >
              Register
            </button>
          </div>

          {error && <div style={s.error}>{error}</div>}

          {tab === 'login' ? (
            <>
              <div style={s.formGroup}>
                <label style={s.label}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <button style={s.btnPrimary} onClick={handleLogin}>
                Log In
              </button>
            </>
          ) : (
            <>
              <div style={s.formGroup}>
                <label style={s.label}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Password</label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regPass2}
                  onChange={(e) => setRegPass2(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                />
              </div>

              <button style={s.btnPrimary} onClick={handleRegister}>
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}