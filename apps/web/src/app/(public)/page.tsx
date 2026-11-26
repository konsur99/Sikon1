'use client';

import React from 'react';
import { useDisplayMode } from '../../context/DisplayModeContext';
import { MobilePreview } from '../../components/mobile/MobilePreview';

export default function HomePage() {
  const { isAndroid } = useDisplayMode();

  // Mode desktop dan mode android sekarang 100% tersinkronisasi:
  // Memakai menu, komponen, sub-layar Stitch (0-15), 8-item squircle grid,
  // dan alur yang sama persis — hanya berbeda pada ukuran/skala responsif
  // (Desktop: widescreen 7xl container & grid 8-kolom, HP: frame native 412px).
  return <MobilePreview defaultDeviceView={isAndroid ? 'mobile' : 'desktop'} />;
}
