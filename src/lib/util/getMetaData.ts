import type { Metadata } from 'next';

import { Meta } from '@/Meta';

interface generateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
}

export const getMetadata = (metadataProps?: generateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | 반디부디` : Meta.title;
  const DESCRIPTION = description || Meta.description;
  const PAGE_URL = asPath ? Meta.url + asPath : Meta.url;
  const OG_IMAGE = ogImage || Meta.image;

  const metadata: Metadata = {
    metadataBase: new URL(Meta.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...Meta.keywords],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};
