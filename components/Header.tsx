import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import RedditLogo from '../public/pngwing.png';
import Button from './button';
import { LogOutButton } from './Log-out-Button';

export const Header = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="p-3 md:p-5 flex flex-row item-center justify-between">
      <Link href="/" className="flex flex-row items-center">
        <Image
          src={RedditLogo}
          alt="logo"
          className="h-12 w-12 md:h-16 md:w-16 "
        />{' '}
        <h1 className="text-red-500 text-3xl font-extrabold hidden sm:block">
          Reddit
        </h1>
      </Link>
      {user ? (
        <div className="flex items-center justify-end gap-2 w-[250px] max-w-1/2">
          <Button type="button" size="tertiary" variant="tertiary">
            <Link href="/create">Create post</Link>
          </Button>

          <LogOutButton />
        </div>
      ) : (
        <div className='w-20 md:w-28 flex items-center'>
          <Button type="button" size="primary" variant="secondary">
            <Link href="/auth/log-in">Log In</Link>
          </Button>
        </div>
      )}
    </header>
  );
};
