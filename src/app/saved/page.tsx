'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Saved() {
  const [savedPackages, setSavedPackages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('saved');
    const json = saved ? JSON.parse(saved) : [];
    setSavedPackages(json);
  }, []);

  const remove = (pkgName: string) => {
    const saved = localStorage.getItem('saved');
    const json = saved ? JSON.parse(saved) : [];
    const index = json.indexOf(pkgName);
    json.splice(index, 1);
    localStorage.setItem('saved', JSON.stringify(json));
    setSavedPackages(json);
    return toast.success('Removed from saved');
  };
  return (
    <>
      <div className="mb-5">
        <h1 className="text-4xl font-semibold">Saved packages</h1>

        {savedPackages.map((pkgName: string) => {
          return (
            <div key={pkgName} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg my-3">
              <p className="text-white">{pkgName}</p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive" onClick={() => remove(pkgName)}>
                      <Trash />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove from saved</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        })}
      </div>
    </>
  );
}
