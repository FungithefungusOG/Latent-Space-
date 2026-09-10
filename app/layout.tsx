import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['700', '800'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Latent Space | AI Retreat',
  description: 'Spain\'s premier AI workshop space. An intimate, collaborative environment where builders, researchers, and visionaries shape what comes next.',
  openGraph: {
    title: 'Latent Space | AI Retreat',
    description: 'A curated AI workshop space for builders, thinkers, and creators. 10 attendees. 5 days, 4 nights. Held in Spain.',
    type: 'website',
  },
};

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>
        {children}
        <GoogleAnalytics gaId="G-6ZG4VCB53V" />
      </body>
    </html>
  );
}
