'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useDisplayMode } from '../../context/DisplayModeContext';
import { MobilePreview, UserPersona } from '../../components/mobile/MobilePreview';

export default function HomePage() {
  const { isAndroid } = useDisplayMode();
  const searchParams = useSearchParams();
  const rawPersona = searchParams.get('persona');
  const validPersona: UserPersona = rawPersona === 'publik' || rawPersona === 'pengurus' || rawPersona === 'cabor'
    ? rawPersona
    : 'cabor';

  return (
    <MobilePreview
      defaultDeviceView={isAndroid ? 'mobile' : 'desktop'}
      defaultPersona={validPersona}
    />
  );
}
