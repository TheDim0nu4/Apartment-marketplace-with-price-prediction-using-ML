import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ApartmentCard from '../components/ApartmentCard';

const s = {
  page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1.5rem',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2rem',
    fontWeight: 500,
  },
  count: { fontSize: '0.85rem', color: '#6B6860' },

  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'flex-end',
    background: '#FDFCF9',
    border: '1px solid #E2DDD4',
    borderRadius: '12px',
    padding: '1rem 1.25rem',
    marginBottom: '1.75rem',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    flex: '1 1 160px',
    minWidth: '140px',
  },
  filterLabel: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: '#6B6860',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  filterInput: {
    padding: '0.55rem 0.85rem',
    border: '1px solid #E2DDD4',
    borderRadius: '8px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    color: '#1C1C1A',
    background: '#fff',
    outline: 'none',
    width: '100%',
  },
  toggleBtn: (active) => ({
    padding: '0.55rem 1rem',
    borderRadius: '8px',
    border: active ? '1px solid #C4A96B' : '1px solid #E2DDD4',
    background: active ? '#1C1C1A' : '#fff',
    color: active ? '#C4A96B' : '#6B6860',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    fontWeight: active ? 500 : 400,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.18s',
    alignSelf: 'flex-end',
    height: '38px',
  }),
  resetBtn: {
    padding: '0.55rem 1rem',
    borderRadius: '8px',
    border: '1px solid #E2DDD4',
    background: 'transparent',
    color: '#6B6860',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.85rem',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    height: '38px',
    transition: 'color 0.2s, border-color 0.2s',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.25rem',
  },
  empty: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '3rem',
    color: '#6B6860',
    fontSize: '0.95rem',
  },
};

const DEFAULT_FILTERS = {
  city: '',
  minPrice: '',
  maxPrice: '',
  onlyMine: false,
};

export default function ListingsPage({ onSelect }) {
  const { listings, currentUser } = useApp();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const set = (key) => (val) => setFilters(f => ({ ...f, [key]: val }));

  const filtered = useMemo(() => {
    return listings.filter(apt => {
      if (filters.city && !apt.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (filters.minPrice && apt.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && apt.price > Number(filters.maxPrice)) return false;
      if (filters.onlyMine && apt.email !== currentUser?.email) return false;
      return true;
    });
  }, [listings, filters, currentUser]);

  const hasActiveFilters = filters.city || filters.minPrice || filters.maxPrice || filters.onlyMine;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>Apartments for Sale</h1>
        <span style={s.count}>{filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}</span>
      </div>

      <div style={s.filterBar}>
        <div style={s.filterGroup}>
          <label style={s.filterLabel}>City</label>
          <input
            type="text"
            placeholder="e.g. Bratislava"
            value={filters.city}
            onChange={e => set('city')(e.target.value)}
            style={s.filterInput}
          />
        </div>

        <div style={{ ...s.filterGroup, flex: '0 1 130px' }}>
          <label style={s.filterLabel}>Min Price (€)</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={filters.minPrice}
            onChange={e => set('minPrice')(e.target.value)}
            style={s.filterInput}
          />
        </div>

        <div style={{ ...s.filterGroup, flex: '0 1 130px' }}>
          <label style={s.filterLabel}>Max Price (€)</label>
          <input
            type="number"
            placeholder="no limit"
            min="0"
            value={filters.maxPrice}
            onChange={e => set('maxPrice')(e.target.value)}
            style={s.filterInput}
          />
        </div>

        <button
          style={s.toggleBtn(filters.onlyMine)}
          onClick={() => set('onlyMine')(!filters.onlyMine)}
        >
          {filters.onlyMine ? '★ My Listings' : '☆ My Listings Only'}
        </button>

        {hasActiveFilters && (
          <button
            style={s.resetBtn}
            onMouseEnter={e => { e.target.style.color='#1C1C1A'; e.target.style.borderColor='#C4A96B'; }}
            onMouseLeave={e => { e.target.style.color='#6B6860'; e.target.style.borderColor='#E2DDD4'; }}
            onClick={() => setFilters(DEFAULT_FILTERS)}
          >
            ✕ Clear Filters
          </button>
        )}
      </div>

      <div style={s.grid}>
        {filtered.length > 0 ? (
          filtered.map((apt) => (
            <ApartmentCard key={apt.id} apartment={apt} onClick={() => onSelect(apt)} />
          ))
        ) : (
          <div style={s.empty}>
            No listings match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
