import React from 'react';
import { useApp } from '../context/AppContext';

const s = {
  page: { padding: '2rem', maxWidth: '860px', margin: '0 auto' },
  backBtn: {
    background: 'none',
    border: 'none',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    color: '#6B6860',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginBottom: '1.5rem',
    padding: 0,
    transition: 'color 0.2s',
  },
  imgBox: {
    width: '100%',
    height: '320px',
    borderRadius: '14px',
    background: '#EDE4D0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '5rem',
    marginBottom: '2rem',
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' },
  price: {
    fontSize: '2.2rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  location: { fontSize: '1rem', color: '#6B6860', marginBottom: '1.5rem' },
  table: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    border: '1px solid #E2DDD4',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '1.5rem',
  },
  cellLabel: {
    padding: '0.9rem 1.25rem',
    borderBottom: '1px solid #E2DDD4',
    borderRight: '1px solid #E2DDD4',
    fontSize: '0.82rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#6B6860',
    background: '#F9F7F2',
  },
  cellValue: {
    padding: '0.9rem 1.25rem',
    borderBottom: '1px solid #E2DDD4',
    fontSize: '0.9rem',
  },
  yes: { color: '#3B7A57', fontWeight: 500 },
  no: { color: '#6B6860' },
  contact: {
    marginTop: '1.2rem',
    fontSize: '0.95rem',
    color: '#6B6860',
  },
  deleteBtn: {
    marginTop: '1rem',
    padding: '0.7rem 1.2rem',
    background: '#FFEEEE',
    border: '1px solid #FFBDBD',
    color: '#C0392B',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem'
  }
};

const rows = [
  { label: 'Rooms', key: 'rooms', render: (v) => v },
  { label: 'Area', key: 'area', render: (v) => `${v} m²` },
  { label: 'Price', key: 'price', render: (v) => `€ ${v.toLocaleString()}` },
  { label: 'Renovated', key: 'renovated', bool: true },
  { label: 'Garage', key: 'garage', bool: true },
  { label: 'Balcony', key: 'balcony', bool: true },
  { label: 'New Building', key: 'newBuilding', bool: true },
];

export default function DetailPage({ apartment, onBack }) {
  const { currentUser, deleteListing } = useApp();
  const { city, image, email } = apartment;
  const isMine = currentUser?.email === email;
  const isLast = (i) => i >= rows.length * 2 - 2;
  

  return (
    <div style={s.page}>
      <button
        style={s.backBtn}
        onMouseEnter={e => e.currentTarget.style.color = '#1C1C1A'}
        onMouseLeave={e => e.currentTarget.style.color = '#6B6860'}
        onClick={onBack}
      >
        ← Back to listings
      </button>

      <div style={s.imgBox}>
        {image ? <img src={image} alt={city} style={s.img} /> : emoji}
      </div>

      <div style={s.price}>€ {apartment.price.toLocaleString()}</div>
      <div style={s.location}>{city}</div>

      <div style={s.table}>
        {rows.map((row, i) => {
          const val = apartment[row.key];
          const noBorderBottom = isLast(i * 2);
          return (
            <React.Fragment key={row.key}>
              <div style={{ ...s.cellLabel, ...(noBorderBottom ? { borderBottom: 'none' } : {}) }}>
                {row.label}
              </div>
              <div style={{
                ...s.cellValue,
                ...(noBorderBottom ? { borderBottom: 'none' } : {}),
                ...(row.bool ? (val ? s.yes : s.no) : {}),
              }}>
                {row.bool ? (val ? 'Yes' : 'No') : row.render(val)}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div style={s.contact}>
        Contact owner:{" "}
        {isMine ? (
          <span style={{ fontWeight: 600 }}>You</span>
        ) : (
          <a href={`mailto:${email}`} style={{ color: '#1C1C1A', fontWeight: 500 }}>
            {email}
          </a>
        )}
      </div>

      {isMine && (
        <button
          style={s.deleteBtn}
          onClick={() => {
            deleteListing(apartment.id);
            onBack();
          }}
        >
          🗑 Delete listing
        </button>
      )}

    </div>
  );
}
