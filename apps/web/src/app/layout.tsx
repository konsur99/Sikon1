import React from 'react';
import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { DisplayModeProvider } from '../context/DisplayModeContext';
import { FloatingModeSwitcher } from '../components/common/FloatingModeSwitcher';

export const metadata: Metadata = {
  title: 'SIKONI — Sistem Informasi KONI Surakarta',
  description: 'Sistem Informasi Terpadu KONI Kota Surakarta (Website Publik & Web Admin Responsif Desktop & Android)',
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
      <body className="bg-sikoni-bg text-sikoni-ink min-h-screen flex flex-col">
        <DisplayModeProvider>
          {children}
          <FloatingModeSwitcher />
        </DisplayModeProvider>
      </body>
    </html>
  );
}
