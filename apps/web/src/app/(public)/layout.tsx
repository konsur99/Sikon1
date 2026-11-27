'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PublicHeader, PublicFooter } from '../../components/layout/PublicHeader';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Jika di beranda (/), render edge-to-edge tampilan terpadu SIKONI (Desktop & Mobile)
  // dengan kontrol perangkat interaktif (HP, Tablet, Desktop) tanpa duplikasi header/footer website lama.
  const isPureAppView = pathname === '/';

  if (isPureAppView) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-surface sm:bg-slate-100">
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
