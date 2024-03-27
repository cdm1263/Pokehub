import Provider from '@/Provider';
import dynamic from 'next/dynamic';
import AuthGuard from '@/provider/AuthGuard';
import { getMetadata } from '@/lib/util/getMetaData';
import '@/styles/global.scss';
import LikedSnapshot from '@/components/users/LikedSnapshot';

const Header = dynamic(() => import('@/components/header/Header'), {
  ssr: false,
});
/* 
export const metadata = getMetadata(); */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
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
