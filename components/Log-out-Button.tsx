'use client';

import { LogOut } from '@/actions/log-out';

export const LogOutButton = () => {
  return (
    <button
      className="md:w-full h-[35px] bg-zinc-800 w-28 h text-white  rounded-[40px] font-medium"
      onClick={() => LogOut()}
    >
      Log out
    </button>
  );
};
