'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin_koni' | 'bendahara' | 'verifikator' | 'operator_cabor';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  caborId?: string;
  caborName?: string;
  mfaEnabled: boolean;
  sessionToken: string;
  expiresAt: string;
  isDemo: boolean;
}

export const DEMO_USERS: Record<string, UserSession> = {
  'admin@koni-surakarta.id': {
    id: 'USR-001',
    name: 'Her Suprabu, S.P., M.M.',
    email: 'admin@koni-surakarta.id',
    role: 'admin_koni',
    roleLabel: 'Ketua Umum KONI Surakarta',
    mfaEnabled: true,
    sessionToken: 'token_admin_koni_demo_2026',
    expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    isDemo: true,
  },
  'bendahara@koni-surakarta.id': {
    id: 'USR-002',
    name: 'Rudi Jauhari, S.E., S.T.',
    email: 'bendahara@koni-surakarta.id',
    role: 'bendahara',
    roleLabel: 'Bendahara Umum KONI Surakarta',
    mfaEnabled: true,
    sessionToken: 'token_bendahara_koni_demo_2026',
    expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    isDemo: true,
  },
  'verifikator@koni-surakarta.id': {
    id: 'USR-003',
    name: 'Bambang',
    email: 'verifikator@koni-surakarta.id',
    role: 'verifikator',
    roleLabel: 'Bidang Organisasi, Hukum & MSD',
    mfaEnabled: false,
    sessionToken: 'token_verifikator_koni_demo_2026',
    expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    isDemo: true,
  },
  'pasi@cabor.koni-surakarta.id': {
    id: 'USR-004',
    name: 'Dr. H. Sugiyanto, M.Pd',
    email: 'pasi@cabor.koni-surakarta.id',
    role: 'operator_cabor',
    roleLabel: 'Ketua Pengkot PASI (Atletik)',
    caborId: 'PASI',
    caborName: 'Persatuan Atletik Seluruh Indonesia',
    mfaEnabled: false,
    sessionToken: 'token_pasi_cabor_demo_2026',
    expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    isDemo: true,
  },
};

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (email: string, targetUrl?: string) => void;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  hasRole: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Read persistent session from localStorage / cookie
    try {
      const saved = localStorage.getItem('sikoni_session_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify expiry
        if (new Date(parsed.expiresAt).getTime() > Date.now()) {
          setUser(parsed);
          document.cookie = `sikoni_session=${parsed.sessionToken}; path=/; max-age=28800; SameSite=Lax`;
        } else {
          localStorage.removeItem('sikoni_session_user');
          document.cookie = 'sikoni_session=; path=/; max-age=0';
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, targetUrl = '/admin/dashboard') => {
    const demoUser = DEMO_USERS[email] || {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'admin_koni',
      roleLabel: 'Admin Organisasi',
      mfaEnabled: false,
      sessionToken: `token_${Date.now()}`,
      expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
      isDemo: true,
    };

    setUser(demoUser);
    localStorage.setItem('sikoni_session_user', JSON.stringify(demoUser));
    document.cookie = `sikoni_session=${demoUser.sessionToken}; path=/; max-age=28800; SameSite=Lax`;
    router.push(targetUrl);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sikoni_session_user');
    document.cookie = 'sikoni_session=; path=/; max-age=0';
    router.push('/login');
  };

  const hasRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
