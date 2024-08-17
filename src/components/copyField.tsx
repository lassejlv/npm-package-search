'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

interface Props {
  name: string;
}

export default function CopyField({ name }: Props) {
  const [packageManager, setPackageManager] = useState<string>('bun');

  useEffect(() => {
    const hasInLocal = localStorage.getItem('packageManager');
    if (!hasInLocal) return setPackageManager('bun');
    else setPackageManager(hasInLocal);
  }, [packageManager]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${packageManager} install ${name}`);

    return toast.success('Copied to clipboard!');
  };

  return (
    <>
      <Input type="text" readOnly value={`${packageManager} install ${name}`} />
      <Button onClick={handleCopy}>
        <Copy size={18} />
      </Button>
    </>
  );
}
