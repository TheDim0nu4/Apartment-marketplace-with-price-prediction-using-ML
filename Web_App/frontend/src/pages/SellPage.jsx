import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import RadioGroup from '../components/RadioGroup';

const s = {
  page: { padding: '2rem', maxWidth: '600px', margin: '0 auto' },

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
  },

  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    marginBottom: '2rem',
  },

  success: {
    background: '#DFF0E5',
    border: '1px solid #B3D9C4',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    color: '#1A5435',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

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

  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },

  divider: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#6B6860',
    margin: '1.5rem 0 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  dividerLine: { flex: 1, height: '1px', background: '#E2DDD4' },

  uploadArea: {
    border: '2px dashed #E2DDD4',
    borderRadius: '10px',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s',
    background: '#fff',
  },

  uploadIcon: { fontSize: '2rem', marginBottom: '0.5rem' },
  uploadText: { fontSize: '0.88rem', color: '#6B6860' },
  fileName: { fontSize: '0.82rem', color: '#6B6860', marginTop: '0.5rem' },

  priceRow: { display: 'flex', gap: '0.75rem', alignItems: 'flex-end' },

  priceInput: { flex: 1 },

  btnAI: {
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, #2D1B69, #553C9A)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    height: '44px',
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
    marginTop: '1.5rem',
  },
};

const initialForm = {
  city: '',
  rooms: '',
  area: '',
  price: '',
  renovated: false,
  garage: false,
  balcony: false,
  newBuilding: false,
  image: null,
  imagePreview: null,
};

export default function SellPage({ onBack }) {
  const { addListing } = useApp();

  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (ev) =>
      setForm((f) => ({
        ...f,
        image: file,
        imagePreview: ev.target.result,
      }));

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setError('');

    if (!form.city || !form.rooms || !form.area || !form.price || !form.image) {
      setError('Please fill in all required fields and upload a photo.');

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }

    const newApt = {
      city: form.city,
      rooms: Number(form.rooms),
      area: Number(form.area),
      price: Number(form.price),
      renovated: form.renovated,
      garage: form.garage,
      balcony: form.balcony,
      new_building: form.newBuilding,
      image: form.image,
    };

    await addListing(newApt);

    setSuccess(true);
    setForm(initialForm);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setTimeout(onBack, 1300);
  };

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={onBack}>← Back</button>
      <h1 style={s.title}>List Apartment for Sale</h1>

      {success && (
        <div style={s.success}>
          ✓ Listing published successfully! Redirecting...
        </div>
      )}

      {error && (
        <div style={{ ...s.success, background: '#FCEBEB', border: '1px solid #F09595', color: '#A32D2D' }}>
          {error}
        </div>
      )}

      {/* Photo upload */}
      <div style={s.formGroup}>
        <label style={s.label}>Apartment Photo</label>

        <div
          style={s.uploadArea}
          onClick={() => document.getElementById('file-input').click()}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#C4A96B';
            e.currentTarget.style.background = '#EDE4D0';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#E2DDD4';
            e.currentTarget.style.background = '#fff';
          }}
        >
          {form.imagePreview ? (
            <img
              src={form.imagePreview}
              alt="preview"
              style={{ maxHeight: '120px', borderRadius: '8px' }}
            />
          ) : (
            <>
              <div style={s.uploadIcon}>📷</div>
              <div style={s.uploadText}>
                <strong>Click to upload</strong> or drag and drop
              </div>
              <div style={{ ...s.uploadText, fontSize: '0.78rem', marginTop: '0.25rem' }}>
                PNG, JPG up to 10MB
              </div>
            </>
          )}
        </div>

        <input
          type="file"
          id="file-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />

        {form.image && <div style={s.fileName}>📎 {form.image.name}</div>}
      </div>

      {/* Divider */}
      <div style={s.divider}><div style={s.dividerLine}/>Details<div style={s.dividerLine}/></div>

      <div style={s.row2}>
        <div style={s.formGroup}>
          <label style={s.label}>City</label>
          <input
            type="text"
            placeholder="Bratislava"
            value={form.city}
            onChange={e => set('city')(e.target.value)}
          />
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>Number of Rooms</label>
          <input
            type="number"
            placeholder="1"
            min="1"
            value={form.rooms}
            onChange={e => set('rooms')(e.target.value)}
          />
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>Area (m²)</label>
        <input
          type="number"
          placeholder="10"
          min="10"
          value={form.area}
          onChange={e => set('area')(e.target.value)}
        />
      </div>

      {/* Divider */}
      <div style={s.divider}><div style={s.dividerLine}/>Features<div style={s.dividerLine}/></div>

      <div style={s.formGroup}>
        <label style={s.label}>Renovated</label>
        <RadioGroup name="renovated" value={form.renovated} onChange={set('renovated')} />
      </div>

      <div style={s.row2}>
        <div style={s.formGroup}>
          <label style={s.label}>Garage</label>
          <RadioGroup name="garage" value={form.garage} onChange={set('garage')} />
        </div>

        <div style={s.formGroup}>
          <label style={s.label}>Balcony</label>
          <RadioGroup name="balcony" value={form.balcony} onChange={set('balcony')} />
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>New Building</label>
        <RadioGroup name="newBuilding" value={form.newBuilding} onChange={set('newBuilding')} />
      </div>

      {/* Divider */}
      <div style={s.divider}><div style={s.dividerLine}/>Price<div style={s.dividerLine}/></div>

      <div style={s.priceRow}>
        <div style={s.priceInput}>
          <label style={s.label}>Price (EUR)</label>
          <input
            type="number"
            placeholder="85000"
            min="0"
            value={form.price}
            onChange={e => set('price')(e.target.value)}
          />
        </div>

        <button
          style={s.btnAI}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          onClick={() => alert('AI price prediction — coming soon!')}
        >
          ✦ Predict with AI
        </button>
      </div>

      <button
        style={s.btnPrimary}
        onMouseEnter={e => e.currentTarget.style.background = '#333'}
        onMouseLeave={e => e.currentTarget.style.background = '#1C1C1A'}
        onClick={handleSubmit}
      >
        Publish Listing
      </button>
    </div>
  );
}