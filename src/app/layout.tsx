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
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        variables: {
          colorPrimary: '#C9A96E',
          colorBackground: '#141414',
          colorNeutral: '#FAFAF8',
          borderRadius: '0.75rem',
        },
        elements: {
          card: 'bg-[#141414] border border-white/20 shadow-2xl rounded-2xl text-white',
          cardBox: 'bg-[#141414] border border-white/20 shadow-2xl rounded-2xl text-white',
          headerTitle: 'font-serif text-[#C9A96E] text-2xl font-bold',
          headerSubtitle: 'text-white/90 text-sm font-normal',
          socialButtonsBlockButton: 'bg-white/5 border border-white/20 hover:border-[#C9A96E] hover:bg-white/10 transition-colors text-white',
          socialButtonsBlockButtonText: 'text-white font-medium text-sm',
          socialButtonsBlockButtonIcon: 'brightness-200',
          dividerLine: 'bg-white/20',
          dividerText: 'text-white/70 text-xs uppercase tracking-wider',
          formFieldLabel: 'text-white/90 text-xs font-semibold uppercase tracking-wider',
          formFieldInput: 'bg-[#1A1A1A] text-white border border-white/20 focus:border-[#C9A96E] placeholder:text-white/40',
          formButtonPrimary: 'bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-bold uppercase tracking-widest text-xs py-3',
          footerActionText: 'text-white/80 text-sm',
          footerActionLink: 'text-[#C9A96E] hover:text-white transition-colors font-semibold',
          identityPreviewText: 'text-white font-medium',
          identityPreviewEditButtonIcon: 'text-[#C9A96E]',
          formFieldSuccessText: 'text-emerald-400',
          formFieldErrorText: 'text-red-400',
          formFieldWarningText: 'text-amber-400',
          userButtonPopoverCard: 'bg-[#141414] border border-white/20 shadow-2xl rounded-2xl text-white',
          userButtonPopoverActionButton: 'text-white hover:bg-white/10 hover:text-[#C9A96E] transition-colors',
          userButtonPopoverActionButtonText: 'text-white font-medium text-xs',
          userButtonPopoverActionButtonIcon: 'text-[#C9A96E]',
          userButtonPopoverFooter: 'hidden',
          userPreviewMainIdentifier: 'text-white font-semibold text-sm',
          userPreviewSecondaryIdentifier: 'text-white/80 text-xs',
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
        <body
          className="font-body min-h-screen flex flex-col bg-background text-foreground selection:bg-[#C9A96E] selection:text-black"
          suppressHydrationWarning
        >
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
