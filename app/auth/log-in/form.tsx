'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@/components/button';
import { Input } from '@/components/input-component';
import { LogIn } from '@/actions/log-in';
import { logInSchema } from '@/actions/schemas';

export default function LogInForm() {
  const { mutate, error, isPending } = useMutation({
    mutationFn: LogIn,
    onError: error => console.log(error.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(values => mutate(values))}
      className="flex w-full max-w-md flex-col gap-4 "
    >
      <Input
        {...register('email')}
        label="email"
        error={errors.email}
      />
      <Input
        {...register('password')}
        label="password"
        type="password"
        error={errors.password}
      />
      <Button type="submit" variant="primary" size="primary">
        {isPending ? 'logging in...' : 'Log in'}
      </Button>
      {error && <p className="text-primary">{error.message}</p>}
    </form>
  );
}
