import { Metadata } from 'next';

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = 'Piyella - Premium Luxury Fashion',
  description = 'Discover the finest collection of luxury fashion and accessories at Piyella. Elevate your style with our premium curated selections.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: '%s | Piyella',
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: 'website',
      siteName: 'Piyella',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@piyella',
    },
    icons,
    metadataBase: new URL('https://piyella.com'), // Replace with actual domain
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
