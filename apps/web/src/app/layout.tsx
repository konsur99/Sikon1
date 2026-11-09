import React from 'react';
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIKONI — Sistem Informasi KONI Surakarta',
  description: 'Sistem Informasi Terpadu KONI Kota Surakarta (Website Publik, Web Admin, dan Android)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-sikoni-bg text-sikoni-ink min-h-screen flex flex-col">{children}</body>
    </html>
  );
}

