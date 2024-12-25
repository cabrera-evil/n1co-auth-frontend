import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://n1co-auth-frontend.vercel.app/',
    languages: {
      en: '/',
    },
  },
  authors: [
    {
      name: 'cabrera-evil',
      url: 'https://cabrera-dev.com/',
    },
  ],
  creator: 'cabrera-evil',
  description: 'N1co Auth Validator',
  keywords: ['Next.js', 'React', 'TypeScript', 'N1co'],
  openGraph: {
    title: 'N1co Auth Validator',
    description: 'Validate n1co auth urls',
    url: 'https://n1co-auth-frontend.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://n1co-auth-frontend.vercel.app/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1723581090%2Ffront%2Fnext-conf-2024%2Ftakeover.png&w=1080&q=75&dpl=dpl_4kWRRdpV5mEWMp9Zhahs8vP5fgBq',
        width: 800,
        height: 600,
        alt: 'N1co Auth Validator',
      },
    ],
  },
  publisher: 'cabrera-evil',
  title: 'N1co Auth Validator',
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
    <html lang="en" {...poppins}>
      <body>{children}</body>
    </html>
  );
}
