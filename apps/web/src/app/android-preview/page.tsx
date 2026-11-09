'use client';

import React from 'react';
import { Topbar } from '../../components/layout/Topbar';
import { MobilePreview } from '../../components/mobile/MobilePreview';

export default function AndroidPreviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#e9edf1]">
      <Topbar />
      <main className="flex-1">
        <MobilePreview />
      </main>
    </div>
  );
}

