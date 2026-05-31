import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KYR Real Estate — Dubai Luxury Property',
  description: 'KYR Real Estate connects qualified buyers with exceptional properties across Dubai\'s most prestigious addresses.',
  keywords: 'KYR real estate, Dubai luxury property, off-plan Dubai, Golden Visa UAE, luxury apartments Dubai',
  openGraph: {
    title: 'KYR Real Estate — Dubai Luxury Property',
    description: 'Dubai\'s trusted real estate partner — precision, transparency, results.',
    type: 'website',
    locale: 'en_AE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
