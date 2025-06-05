'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { getPostsByQuery } from '@/utils/supabase/queries';
import { SearchIcon, UserRound, X } from 'lucide-react';
import Link from 'next/link';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [delayedQuery, setDelayedQuery] = useState('');
  const [noResultsVisible, setNoResultsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedQuery(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const { data } = useQuery({
    queryKey: ['search', delayedQuery],
    queryFn: async () => {
      if (inputValue.length > 1) {
        const { data, error } = await getPostsByQuery(delayedQuery);
        if (error) throw error;
        return data;
      }
    },
    enabled: () => (inputValue && inputValue.length >= 2 ? true : false),
  });

  useEffect(() => {
    setDelayedQuery('');
    setInputValue('');
  }, [pathname]);

  const clearInput = () => {
    setTimeout(() => {
      setInputValue('');
    }, 1000);
  };

  useEffect(() => {
    if (delayedQuery && data?.length === 0) {
      const noPostsTimeout = setTimeout(() => {
        setNoResultsVisible(true);
      }, 500);

      return () => {
        clearTimeout(noPostsTimeout);
      };
    } else {
      setNoResultsVisible(false);
    }
  }, [delayedQuery, data]);

  return (
    <section className="z-50 flex justify-center items-center bg-white py-1 pl-3 rounded-full">
      <div className="flex flex-row gap-3 p-1  w-[80%] max-w-[44rem] border-b-2 border-orange-400">
        <label className="flex justify-center" htmlFor="search">
          <SearchIcon size={20} color="gray" />
        </label>
        <input
          value={inputValue}
          id="search"
          className="outline-none text-zink-500 w-auto focus:w-auto focus:px-2 self-end"
          placeholder="Search..."
          type="text"
          onBlur={clearInput}
          onChange={event => {
            setInputValue(event.target.value);
          }}
        />

        {inputValue ? (
          <X
            onClick={() => {
              setInputValue('');
            }}
            className="cursor-pointer text-neutral-500 hover:text-black mr-2"
            size={15}
          />
        ) : (
          <div className="w-[15px]"></div>
        )}
      </div>
      {inputValue === '' ? (
        ''
      ) : data?.length === 0 ? (
        <div className="z-40 absolute top-16 left-0 w-full justify-center items-center flex flex-col gap-1 rounded-lg ">
          {noResultsVisible && (
            <div className="bg-neutral-200 rounded-lg  p-2 border-2 shadow-lg">
              No posts found...
            </div>
          )}
        </div>
      ) : (
        <div className="z-40 absolute top-16 right-4 flex flex-col gap-1 rounded-lg ">
          {data?.map(item => (
            <Link
              className="bg-neutral-200 hover:bg-orange-400 rounded-lg  p-2 border-2 shadow-lg w-[250px]"
              key={item.id}
              href={`/post/${item.slug}`}
            >
              <p className="font-light text-sm flex items-center gap-1">
                <UserRound size={14} />
                {item.users.user_name}
              </p>
              <p className="font-medium">{item.title}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};