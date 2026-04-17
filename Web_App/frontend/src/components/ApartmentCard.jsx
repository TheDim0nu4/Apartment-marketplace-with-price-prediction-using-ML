import React from 'react';

const styles = {
  card: {
    background: '#FDFCF9',
    border: '1px solid #E2DDD4',
    borderRadius: '14px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
  },
  imgBox: {
    width: '100%',
    height: '180px',
    background: '#EDE4D0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3.5rem',
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  body: { padding: '1.1rem 1.25rem' },
  price: {
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#1C1C1A',
    marginBottom: '0.3rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6B6860',
    marginBottom: '0.75rem',
  },
  badges: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  badge: {
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 500,
    background: '#EDE4D0',
    color: '#7A5C1E',
  }
};

export default function ApartmentCard({ apartment, onClick, currentUser }) {
  const { city, rooms, area, price, renovated, garage, balcony, new_building, image, email } = apartment;
  const isMine = currentUser?.email === email;


  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        ...styles.card,
        background: isMine ? '#EEF6FF' : '#FDFCF9',
        borderColor: isMine ? '#4A90E2' : (hovered ? '#C4A96B' : '#E2DDD4'),
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.08)' : 'none',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.imgBox}>
        {image ? <img src={`http://localhost:8000${image}`} alt={city} style={styles.img} /> : emoji}
      </div>
      <div style={styles.body}>
        <div style={styles.price}>€ {price.toLocaleString()}</div>
        <div style={styles.subtitle}>{city} · {rooms} room{rooms > 1 ? 's' : ''} · {area} m²</div>
        <div style={styles.badges}>
          {isMine && (
            <span style={{
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: '#E3F2FD',
              color: '#1565C0'
            }}>
              Your listing
            </span>
          )}

          {new_building && <span style={styles.badge}>New Building</span>}
          {balcony && <span style={styles.badge}>Balcony</span>}
          {garage && <span style={styles.badge}>Garage</span>}
          {renovated && <span style={styles.badge}>Renovated</span>}
        </div>
      </div>
    </div>
  );
}
