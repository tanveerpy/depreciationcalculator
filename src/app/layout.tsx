import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL('https://bonusdepreciationcalculator.com'),
  title: {
    default: 'Bonus Depreciation Calculator 2026 | Section 179 Limits & OBBBA',
    template: '%s | Bonus Depreciation Calculator'
  },
  description: 'Calculate your 2026 tax savings with our advanced Section 179 and Bonus Depreciation calculator. Updated for OBBBA and the $2.56M deduction limit.',
  keywords: ['Bonus Depreciation 2026', 'Section 179 Calculator', 'OBBBA Tax Rules', 'Small Business Tax Write-offs', 'Tax Deduction Calculator'],
  authors: [{ name: 'BonusCalc Team' }],
  creator: 'BonusCalc Team',
  publisher: 'BonusCalc',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bonusdepreciationcalculator.com',
    siteName: 'Bonus Depreciation Calculator 2026',
    title: 'Bonus Depreciation Calculator 2026 | Maximize Your Tax Savings',
    description: 'Free calculator for 2026 Bonus Depreciation and Section 179 deductions. Updated for OBBBA legislation.',
    images: [
      {
        url: '/og-image.jpg', // Ensure this asset exists or is replaced
        width: 1200,
        height: 630,
        alt: 'Bonus Depreciation Calculator 2026 Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonus Depreciation Calculator 2026',
    description: 'Calculate your 2026 tax savings with updated OBBBA rules.',
    // images: ['/twitter-image.jpg'], // Optional
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      'name': 'Bonus Depreciation Calculator 2026',
      'url': 'https://bonusdepreciationcalculator.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://bonusdepreciationcalculator.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'Organization',
      'name': 'BonusCalc',
      'url': 'https://bonusdepreciationcalculator.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://bonusdepreciationcalculator.com/logo.png',
        'width': 112,
        'height': 112
      }
    }
  ]
};

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html >
  );
}
