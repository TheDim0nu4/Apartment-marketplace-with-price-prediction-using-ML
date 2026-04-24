import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AuthPage from './pages/AuthPage';
import ListingsPage from './pages/ListingsPage';
import DetailPage from './pages/DetailPage';
import SellPage from './pages/SellPage';
import Navbar from './components/Navbar';
import './styles/global.css';

// Possible views: 'listings' | 'detail' | 'sell'
function MainApp() {
  const { currentUser } = useApp();
  const [view, setView] = useState('listings');
  const [selectedApt, setSelectedApt] = useState(null);

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <>
      <Navbar
        onHome={() => setView('listings')}
        onSell={() => setView('sell')}
      />

      {view === 'listings' && (
        <ListingsPage
          onSelect={(apt) => {
            setSelectedApt(apt);
            setView('detail');
          }}
        />
      )}

      {view === 'detail' && selectedApt && (
        <DetailPage
          apartment={selectedApt}
          onBack={() => setView('listings')}
        />
      )}

      {view === 'sell' && (
        <SellPage onBack={() => setView('listings')} />
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
