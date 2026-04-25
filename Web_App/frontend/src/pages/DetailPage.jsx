import React, { useState } from 'react';

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
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  btnDelete: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    background: '#FCEBEB',
    color: '#D32F2F',
    border: '1px solid #F09595',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 500,
    transition: 'background 0.2s',
  },
  contact: {
    marginTop: '1.5rem',
    fontSize: '0.95rem',
    color: '#1C1C1A',
    padding: '0.9rem 1.25rem',
    border: '1px solid #E2DDD4',
    borderRadius: '12px',
    background: '#F9F7F2'
  },
  contactLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#6B6860',
    marginBottom: '0.3rem'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '14px',
    width: '320px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },

  modalText: {
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
  },

  modalBtns: {
    display: 'flex',
    gap: '0.7rem',
    justifyContent: 'center',
  },

  btnCancel: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #E2DDD4',
    background: '#F9F7F2',
    cursor: 'pointer',
  },

  btnConfirm: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #F09595',
    background: '#FCEBEB',
    color: '#D32F2F',
    cursor: 'pointer',
  }
};

const rows = [
  { label: 'Rooms', key: 'rooms', render: (v) => v },
  { label: 'Area', key: 'area', render: (v) => `${v} m²` },
  { label: 'Price', key: 'price', render: (v) => `€ ${v.toLocaleString()}` },
  { label: 'Renovated', key: 'renovated', bool: true },
  { label: 'Garage', key: 'garage', bool: true },
  { label: 'Balcony', key: 'balcony', bool: true },
  { label: 'New Building', key: 'new_building', bool: true },
];

export default function DetailPage({ apartment, onBack }) {
  const { currentUser, deleteListing } = require('../context/AppContext').useApp();
  const { city, emoji, image, email, id } = apartment;
  const isLast = (i) => i >= rows.length * 2 - 2;
  const isMine = currentUser?.email === email;

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    await deleteListing(id);
    setShowConfirm(false);
    onBack();
  };

  return (
    <div style={s.page}>
      <div style={s.headerRow}>
        <button
          style={s.backBtn}
          onMouseEnter={e => e.currentTarget.style.color = '#1C1C1A'}
          onMouseLeave={e => e.currentTarget.style.color = '#6B6860'}
          onClick={onBack}
        >
          ← Back to listings
        </button>

        {isMine && (
          <button 
            style={s.btnDelete}
            onMouseEnter={e => e.currentTarget.style.background = '#F09595'}
            onMouseLeave={e => e.currentTarget.style.background = '#FCEBEB'}
            onClick={handleDelete}
          >
            Delete listing
          </button>
        )}
      </div>

      <div style={s.imgBox}>
        <img src={image} alt={city} style={s.img} />
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
        <div style={s.contactLabel}>Contact</div>
        <div>{email}</div>
      </div>


      {showConfirm && (
        <div style={s.modalOverlay}>
          <div style={s.modal}>
            <div style={s.modalText}>
              Are you sure you want to delete this listing?
            </div>

            <div style={s.modalBtns}>
              <button
                style={s.btnCancel}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                style={s.btnConfirm}
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
