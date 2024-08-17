'use client';

import { searchPackages } from '@/actions/npm';
import Loader from '@/components/Loader';
import Settings from '@/components/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NpmPackageObject } from '@/lib/types';
import Link from 'next/link';
import React, { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [packages, setPackages] = useState<NpmPackageObject[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const start = performance.now();

    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search-query') as string;
    if (!searchQuery) return toast.error('Please enter a search query');

    setLoading(true);

    const response = await searchPackages(searchQuery);

    if (response.error) return toast.error(response.message);
    if (!response.data) return toast.error('No data found');
    if (!response.data.objects) return toast.error('No packages found');

    setLoading(false);

    const end = performance.now();
    console.log(`Search took ${end - start}ms`);
    setPackages(response.data.objects);
  };

  return (
    <>
      <h1 className="text-4xl font-semibold my-12">Search for npm packages</h1>

      <form className="flex gap-3" onSubmit={submit} ref={formRef} noValidate>
        <Input
          type="text"
          name="search-query"
          className="w-full"
          placeholder="react... vue... next... tailwindcss..."
          onChange={(e) => {
            if (formRef.current) {
              clearTimeout(formRef.current.timeoutId);
              formRef.current.timeoutId = setTimeout(() => {
                if (formRef.current) formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
              }, 300);
            }
          }}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            'search'
          )}
        </Button>
      </form>

      {packages.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold mt-5">Search results</h1>
          <p className="text-gray-500">Found {packages.length} packages</p>
          <div className="grid grid-cols-1 gap-7">
            {packages.map((pkg) => {
              return (
                <div key={pkg.package.name} className="bg-gray-100 p-5 rounded-md">
                  <h2 className="text-xl font-semibold">{pkg.package.name}</h2>
                  <p className="text-gray-500">{pkg.package.description}</p>
                  <Link href={`/pkg/${pkg.package.name}`} rel="noopener noreferrer" className="text-blue-500 underline">
                    View package
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
