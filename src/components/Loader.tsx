'use client';

import { LoaderCircle } from 'lucide-react';
import React from 'react';

export default function Loader({ size = 18 }: { size?: number }) {
  return <LoaderCircle size={size} className="animate-spin inline-block" />;
}
