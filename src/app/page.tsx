'use client';

import { searchPackages } from '@/actions/npm';
import Loader from '@/components/Loader';
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
      <div className="mb-5">
        <h1 className="text-4xl font-semibold">Search for npm packages</h1>

        <p className="text-gray-500 my-3">
          This website is under development. The design is not final and the website is not fully functional. <br /> Please report any
          issues on{' '}
          <Link href="https://github.com/lassejlv/npm-package-search" rel="noopener noreferrer" className="text-blue-500 underline">
            GitHub
          </Link>
          .
        </p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={submit} ref={formRef} noValidate>
        <div className="flex gap-3">
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
        </div>

        <div>
          <p className="text-gray-500">
            View Saved packages{' '}
            <Link href="/saved" rel="noopener noreferrer" className="text-blue-500 underline">
              {' '}
              here
            </Link>
          </p>
        </div>
      </form>

      {packages.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold mt-5">Search results</h1>
          <p className="text-gray-500">Found {packages.length} packages</p>
          <div className="grid grid-cols-1 gap-7">
            {packages.map((pkg) => {
              return (
                <div key={pkg.package.name} className="bg-gray-900 p-5 rounded-md">
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
