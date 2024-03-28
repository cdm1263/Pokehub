import Provider from '@/Provider';
import dynamic from 'next/dynamic';
import type { Viewport } from 'next';
import AuthGuard from '@/provider/AuthGuard';
import { getMetadata } from '@/lib/util/getMetaData';
import '@/styles/global.scss';
import LikedSnapshot from '@/components/users/LikedSnapshot';

const Header = dynamic(() => import('@/components/header/Header'), {
  ssr: false,
});

export const metadata = getMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '포케허브',
  url: 'https://my-pokehub.vercel.app/',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <AuthGuard>
          <Provider>
            <LikedSnapshot />
            <Header />
            {children}
            <div id="modal"></div>
          </Provider>
        </AuthGuard>
      </body>
    </html>
  );
}
