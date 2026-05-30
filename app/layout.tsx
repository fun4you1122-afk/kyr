import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KYR Real Estate — Unlocking Dubai\'s Finest Properties',
  description: 'KYR Real Estate — Dubai\'s premier luxury property agency. Redefining real estate through transparency, expertise, and precision.',
  keywords: 'KYR real estate, Dubai luxury property, off-plan Dubai, Golden Visa UAE, luxury apartments Dubai, Palm Jumeirah villas',
  openGraph: {
    title: 'KYR Real Estate — Unlocking Dubai\'s Finest Properties',
    description: 'Redefining real estate through transparency, expertise, and precision.',
    type: 'website',
    locale: 'en_AE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="js">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
