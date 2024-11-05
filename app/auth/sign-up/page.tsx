import Link from 'next/link';
import SignUpForm from './form';

export default function SignUpPage() {
  return (
    <main className="my-6 w-full  px-6 mt-[20vh] flex grow flex-col items-center">
       <div className='flex w-full grow flex-col  items-center gap-12'>
        <h1>Create account</h1>
        <SignUpForm/>
      </div>
      <Link href='/auth/log-in' className='text-zinc-500'>
        have an account? Log in
      </Link>
    </main>
  );
}