'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PublicHeader, PublicFooter } from '../../components/layout/PublicHeader';
import { useDisplayMode } from '../../context/DisplayModeContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAndroid } = useDisplayMode();

  // If on homepage and in Android mode, render edge-to-edge without website header/footer
  const isPureMobileAppView = pathname === '/' && isAndroid;

  if (isPureMobileAppView) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0d1c2d] sm:bg-[#e9edf1]">
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
