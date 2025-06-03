import { signUp } from '@/actions/sign-up';
import Button from '@/components/button';
import { Input } from '@/components/input-component';

export default function SignUpForm() {
  return (
    <form action={signUp} className="flex w-full max-w-md flex-col gap-4 ">
      <Input type="username" label="username" name='username' required />
      <Input type="file" label="image" name='image'  file={"file:bg-red-500 file:rounded-full file:border-none file:px-4 file:py-1 file:text-white"} />
      <Input type="email" label="email" name='email' required />
      <Input label="password" type="password" name='password' required />
      <Button type="submit" variant="primary" size="primary">
        Sign up
      </Button>
    </form>
  );
}
