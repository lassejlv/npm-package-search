import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const font = JetBrains_Mono({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <Script defer data-domain="npm.lassejlv.dk" src="https://plausible-analytics-ce-production-009d.up.railway.app/js/script.js"></Script>
      <body className={`${font.className} container mx-auto py-12`}>
        <Toaster visibleToasts={1} richColors theme="dark" position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
