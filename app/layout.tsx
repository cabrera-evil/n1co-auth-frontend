import type { Metadata } from 'next';
// import { Poppins } from 'next/font/google';
import React from 'react';
import './globals.css';

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   style: ['normal', 'italic'],
//   variable: '--font-poppins',
//   display: 'swap',
// });

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://nextjs.org/',
    languages: {
      en: '/',
    },
  },
  authors: [
    {
      name: 'Next.js Team',
      url: 'https://nextjs.org/',
    },
  ],
  creator: 'Next.js Team',
  description: 'Generated by create next app',
  keywords: ['Next.js', 'React', 'TypeScript'],
  openGraph: {
    title: 'Create Next App',
    description: 'Generated by create next app',
    url: 'https://nextjs.org/',
    type: 'website',
    images: [
      {
        url: 'https://nextjs.org/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1723581090%2Ffront%2Fnext-conf-2024%2Ftakeover.png&w=1080&q=75&dpl=dpl_4kWRRdpV5mEWMp9Zhahs8vP5fgBq',
        width: 800,
        height: 600,
        alt: 'Create Next App',
      },
    ],
  },
  publisher: 'Next.js Team',
  title: 'Create Next App',
  verification: {
    google: 'google-site-verification=token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}