import React from 'react';
import { useApp } from '../context/AppContext';
import ApartmentCard from '../components/ApartmentCard';

const s = {
  page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '2rem',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    fontWeight: 500,
  },
  count: { fontSize: '0.85rem', color: '#6B6860' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.25rem',
  },
};

export default function ListingsPage({ onSelect }) {
  const { listings } = useApp();

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>Apartments for Sale</h1>
        <span style={s.count}>{listings.length} listings</span>
      </div>
      <div style={s.grid}>
        {listings.map((apt) => (
          <ApartmentCard key={apt.id} apartment={apt} onClick={() => onSelect(apt)} />
        ))}
      </div>
    </div>
  );
}
