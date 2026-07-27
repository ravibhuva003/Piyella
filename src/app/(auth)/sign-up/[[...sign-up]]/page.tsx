import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center w-full">
      <SignUp
        signInUrl="/sign-in"
        forceRedirectUrl="/"
        fallbackRedirectUrl="/"
        initialValues={{
          emailAddress: '',
        }}
        appearance={{
          variables: {
            colorPrimary: '#C9A96E',
            colorBackground: '#141414',
            colorNeutral: '#FAFAF8',
            borderRadius: '0.75rem',
          },
          elements: {
            rootBox: 'w-full flex justify-center',
            cardBox: 'w-full shadow-2xl',
            card: 'bg-[#141414] border border-white/20 shadow-2xl rounded-2xl text-white p-8 w-full max-w-md',
            headerTitle: 'font-serif text-[#C9A96E] text-2xl font-bold text-center',
            headerSubtitle: 'text-white/90 text-sm font-normal text-center',
            socialButtonsBlockButton: 'bg-white/5 border border-white/20 hover:border-[#C9A96E] hover:bg-white/10 transition-colors text-white',
            socialButtonsBlockButtonText: 'text-white font-medium text-sm',
            socialButtonsBlockButtonIcon: 'brightness-200',
            dividerLine: 'bg-white/20',
            dividerText: 'text-white/70 text-xs uppercase tracking-wider',
            formFieldLabel: 'text-white/90 text-xs font-semibold uppercase tracking-wider',
            formFieldInput: 'bg-[#1A1A1A] text-white border border-white/20 focus:border-[#C9A96E] placeholder:text-white/40',
            formButtonPrimary: 'bg-[#C9A96E] hover:bg-[#D4B87C] text-black font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl border-none shadow-lg shadow-[#C9A96E]/20',
            footerActionText: 'text-white/80 text-sm',
            footerActionLink: 'text-[#C9A96E] hover:text-white transition-colors font-semibold',
            identityPreviewText: 'text-white font-medium',
            identityPreviewEditButtonIcon: 'text-[#C9A96E]',
          },
        }}
      />
    </div>
  );
}
