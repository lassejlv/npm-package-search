'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa6';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  name: string;
}

export default function Save({ name }: Props) {
  const [alreadySaved, setAlreadySaved] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('saved');
    const json = saved ? JSON.parse(saved) : [];
    const isSaved = json.includes(name);

    setAlreadySaved(isSaved);
  }, [name]);

  const save = () => {
    if (alreadySaved) {
      // Remove from saved
      const saved = localStorage.getItem('saved');
      const json = saved ? JSON.parse(saved) : [];
      const index = json.indexOf(name);
      json.splice(index, 1);
      localStorage.setItem('saved', JSON.stringify(json));

      setAlreadySaved(false);
      toast.success('Removed from saved');
      return;
    }

    const saved = localStorage.getItem('saved');
    const json = saved ? JSON.parse(saved) : [];
    json.push(name);
    localStorage.setItem('saved', JSON.stringify(json));

    setAlreadySaved(true);
    toast.success('Saved');
    return;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="link" onClick={save}>
            {alreadySaved ? <FaStar className="fill-yellow-400" size={22} /> : <FaRegStar className="fill-gray-400" size={22} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{alreadySaved ? 'Remove from saved' : 'Save this package to later'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
