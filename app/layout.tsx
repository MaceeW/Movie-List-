import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Movie List - Track Your Movies',
  description: 'A simple app to track movies you own by name, genre, rating, and more',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
