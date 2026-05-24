import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "KYR Real Estate — Dubai's Premier Luxury Property Agency",
  description: "Unlocking Dubai's finest properties. Redefining real estate through transparency, expertise, and precision. Off-plan projects, Golden Visa, luxury villas, and premium apartments.",
  keywords: "KYR real estate, Dubai luxury property, off-plan Dubai, Golden Visa UAE, luxury apartments Dubai, Palm Jumeirah villas",
  openGraph: {
    title: "KYR Real Estate — Dubai's Premier Luxury Property Agency",
    description: "Unlocking Dubai's Finest Properties",
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
      </head>
      <body className="antialiased bg-obsidian text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
