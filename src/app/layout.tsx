import './globals.css';
import '@/styles/animations.css';

import { ClerkProvider } from '@clerk/nextjs';
import { playfairDisplay, inter } from '@/lib/fonts';
import { constructMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { AccessibilityProvider } from '@/components/seo/accessibility-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { generateOrganizationSchema } from '@/lib/seo/schema-generator';

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#C9A96E',
          colorBackground: '#0A0A0A',
          borderRadius: '0.5rem',
        },
        elements: {
          card: 'bg-[#0A0A0A] border border-white/10 shadow-2xl rounded-2xl',
          headerTitle: 'font-serif text-[#C9A96E]',
          headerSubtitle: 'text-white/60 font-light',
          socialButtonsBlockButton: 'border border-white/10 hover:border-[#C9A96E] hover:bg-white/5 transition-colors text-white',
          formButtonPrimary: 'bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-semibold uppercase tracking-widest text-xs',
          footerActionLink: 'text-[#C9A96E] hover:text-white transition-colors',
        },
      }}
    >
      <html
        lang="en"
        className={cn(
          'dark antialiased',
          playfairDisplay.variable,
          inter.variable
        )}
        suppressHydrationWarning
      >
        <head>
          <JsonLd data={orgSchema} />
        </head>
        <body className="font-body min-h-screen flex flex-col bg-background text-foreground selection:bg-[#C9A96E] selection:text-black">
          <AccessibilityProvider>
            <div id="main-content" className="flex-1 flex flex-col">
              {children}
            </div>
          </AccessibilityProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
