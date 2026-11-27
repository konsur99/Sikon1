import React from 'react';
import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { DisplayModeProvider } from '../context/DisplayModeContext';
import { AuthProvider } from '../context/AuthContext';
import { FloatingModeSwitcher } from '../components/common/FloatingModeSwitcher';

export const metadata: Metadata = {
  title: 'SIKONI — Sistem Informasi KONI Surakarta',
  description: 'Sistem Informasi Terpadu KONI Kota Surakarta (Website Publik & Web Admin Responsif Desktop & Android)',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SIKONI',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#142a43',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-sikoni-bg text-sikoni-ink min-h-screen flex flex-col">
        <AuthProvider>
          <DisplayModeProvider>
            {children}
            <FloatingModeSwitcher />
          </DisplayModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
