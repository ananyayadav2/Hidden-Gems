'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  savedGems: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  login: (name: string, email: string, role?: UserRole) => UserProfile;
  logout: () => void;
  toggleFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => ({ name: '', email: '', role: 'tourist', savedGems: [] }),
  logout: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
});

// Helper to get all registered users from storage
function getUsersDatabase(): Record<string, UserProfile> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('hg_users_db');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error(e);
    return {};
  }
}

// Helper to save all users to storage
function saveUsersDatabase(db: Record<string, UserProfile>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('hg_users_db', JSON.stringify(db));
  } catch (e) {
    console.error(e);
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Restore active session on initial load
  useEffect(() => {
    try {
      const activeEmail = localStorage.getItem('hg_active_session_email');
      if (activeEmail) {
        const db = getUsersDatabase();
        const existing = db[activeEmail.toLowerCase()];
        if (existing) {
          setUser({
            ...existing,
            savedGems: Array.isArray(existing.savedGems) ? existing.savedGems : [],
          });
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const login = (name: string, email: string, role: UserRole = 'tourist'): UserProfile => {
    const cleanEmail = email.trim().toLowerCase();
    const db = getUsersDatabase();
    
    // Check if user already exists in database
    let profile = db[cleanEmail];

    if (profile) {
      // User exists: update name or role if provided, preserve existing savedGems
      profile = {
        ...profile,
        name: name.trim() || profile.name,
        role: role || profile.role,
        savedGems: Array.isArray(profile.savedGems) ? profile.savedGems : [],
      };
    } else {
      // New user: register in database
      profile = {
        name: name.trim() || cleanEmail.split('@')[0],
        email: cleanEmail,
        role,
        savedGems: [],
      };
    }

    // Persist to user database
    db[cleanEmail] = profile;
    saveUsersDatabase(db);

    // Set active session
    localStorage.setItem('hg_active_session_email', cleanEmail);
    setUser(profile);

    return profile;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hg_active_session_email');
  };

  const toggleFavorite = (placeId: string) => {
    if (!user) {
      alert('Please sign in to save places to your personal favourites collection!');
      return;
    }

    const cleanEmail = user.email.toLowerCase();
    const currentList = Array.isArray(user.savedGems) ? user.savedGems : [];
    const exists = currentList.includes(placeId);
    
    const updatedGems = exists
      ? currentList.filter((id) => id !== placeId)
      : [...currentList, placeId];

    const updatedProfile: UserProfile = {
      ...user,
      savedGems: updatedGems,
    };

    // Update active user state
    setUser(updatedProfile);

    // Persist in accounts database
    const db = getUsersDatabase();
    db[cleanEmail] = updatedProfile;
    saveUsersDatabase(db);
  };

  const isFavorite = (placeId: string) => {
    return user && Array.isArray(user.savedGems) ? user.savedGems.includes(placeId) : false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);