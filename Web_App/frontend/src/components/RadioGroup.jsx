import React from 'react';

export default function RadioGroup({ name, value, onChange }) {
  const base = {
    display: 'flex',
    border: '1px solid #E2DDD4',
    borderRadius: '8px',
    overflow: 'hidden',
    background: '#fff',
  };

  const optStyle = (selected) => ({
    flex: 1,
    padding: '0.65rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    border: 'none',
    borderRight: '1px solid #E2DDD4',
    background: selected ? '#1C1C1A' : '#fff',
    color: selected ? '#fff' : '#6B6860',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
  });

  return (
    <div style={base}>
      <button
        type="button"
        style={{ ...optStyle(value === true), borderRight: '1px solid #E2DDD4' }}
        onClick={() => onChange(true)}
      >
        Yes
      </button>
      <button
        type="button"
        style={{ ...optStyle(value === false), borderRight: 'none' }}
        onClick={() => onChange(false)}
      >
        No
      </button>
    </div>
  );
}
