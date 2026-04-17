import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/auth";
import { fetchApartments, createApartment, deleteApartment } from "../api/apartments";

const AppContext = createContext(null);

export function AppProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [listings, setListings] = useState([]);

  // =========================
  // LOAD APARTMENTS FROM API
  // =========================

  const loadListings = async () => {
    try {

      const data = await fetchApartments();

      setListings(data);

    } catch (err) {

      console.error("Failed to load apartments:", err);

    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  // =========================
  // AUTH
  // =========================

  const login = async (email, password) => {

    const data = await loginRequest(email, password);

    if (!data || !data.access_token) {
      throw new Error("Login failed");
    }

    localStorage.setItem("token", data.access_token);

    setCurrentUser(data.user);
  };

  const register = async (email, password) => {

    const data = await registerRequest(email, password);

    if (!data || !data.access_token) {
      throw new Error("Register failed");
    }

    localStorage.setItem("token", data.access_token);

    setCurrentUser(data.user);
  };

  const logout = () => {

    localStorage.removeItem("token");

    setCurrentUser(null);

  };

  // =========================
  // ADD NEW LISTING
  // =========================

  const addListing = async (listing) => {

    try {

      const newListing = await createApartment(listing);

      setListings((prev) => [newListing, ...prev]);

    } catch (err) {

      console.error("Failed to create apartment:", err);

    }

  };

  const deleteListing = async (id) => {
    try {

      await deleteApartment(id);

      setListings(prev => prev.filter(l => l.id !== id));

    } catch (err) {

      console.error("Failed to delete apartment:", err);

    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        listings,
        login,
        register,
        logout,
        addListing,
        deleteListing
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}