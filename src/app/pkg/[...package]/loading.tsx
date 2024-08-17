'use client';

import Loader from '@/components/Loader';
import React from 'react';

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen gap-2">
      <Loader size={18} /> grabbing package details...
    </div>
  );
}
