import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center">
      <SignUp
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
