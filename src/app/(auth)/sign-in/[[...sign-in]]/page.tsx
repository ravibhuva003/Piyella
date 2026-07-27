import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full shadow-2xl',
          },
        }}
      />
    </div>
  );
}
