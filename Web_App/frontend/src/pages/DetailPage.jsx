import React from 'react';

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
    fontFamily: "'Playfair Display', serif",
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
};

const rows = [
  { label: 'Izby', key: 'rooms', render: (v) => v },
  { label: 'Rozloha', key: 'area', render: (v) => `${v} m²` },
  { label: 'Cena', key: 'price', render: (v) => `${v.toLocaleString('sk-SK')} €` },
  { label: 'Po rekonštrukcii', key: 'renovated', bool: true },
  { label: 'Garáž', key: 'garage', bool: true },
  { label: 'Balkón', key: 'balcony', bool: true },
  { label: 'Novostavba', key: 'newBuilding', bool: true },
];

export default function DetailPage({ apartment, onBack }) {
  const { city, emoji, image } = apartment;
  const isLast = (i) => i >= rows.length * 2 - 2;

  return (
    <div style={s.page}>
      <button
        style={s.backBtn}
        onMouseEnter={e => e.currentTarget.style.color = '#1C1C1A'}
        onMouseLeave={e => e.currentTarget.style.color = '#6B6860'}
        onClick={onBack}
      >
        ← Späť na inzeráty
      </button>

      <div style={s.imgBox}>
        {image ? <img src={image} alt={city} style={s.img} /> : emoji}
      </div>

      <div style={s.price}>{apartment.price.toLocaleString('sk-SK')} €</div>
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
                {row.bool ? (val ? 'Áno' : 'Nie') : row.render(val)}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
