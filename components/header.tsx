/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import SearchInput from './search-input';
import { useRouter } from 'next/router';

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
        <div
          onClick={() => router.push('/')}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
            alt="logo"
          />
        </div>
        <div
          onClick={() => router.push('/')}
          className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <SearchInput />

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')} className="nav-btn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative nav-btn">
                <PaperAirplaneIcon className="nav-btn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>

              <PlusCircleIcon className="nav-btn" />
              <UserGroupIcon className="nav-btn" />
              <HeartIcon className="nav-btn" />

              <img
                onClick={() => signOut()}
                src={
                  status === 'loading'
                    ? './img/avatar.png'
                    : session.user?.image
                }
                alt="avatar"
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button
              onClick={() => {
                router.pathname !== '/auth/signin' && signIn();
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
