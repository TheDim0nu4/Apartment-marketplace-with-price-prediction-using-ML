import React, { createContext, useContext, useState } from 'react';
import { MOCK_LISTINGS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [listings, setListings] = useState(MOCK_LISTINGS);

  const login = (email) => {
    setCurrentUser(email.split('@')[0]);
  };

  const register = (name) => {
    setCurrentUser(name);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addListing = (listing) => {
    setListings((prev) => [listing, ...prev]);
  };

  return (
    <AppContext.Provider value={{ currentUser, listings, login, register, logout, addListing }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
