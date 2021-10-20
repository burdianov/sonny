/* eslint-disable @next/next/no-img-element */

import type { GetServerSidePropsContext } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  getProviders,
  LiteralUnion,
  signIn,
  ClientSafeProvider
} from 'next-auth/react';

import Header from '../../components/header';

const SignIn = ({
  providers
}: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>) => {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-20   px-14 text-center">
        <img
          className="w-80"
          src="https://links.papareact.com/ocw"
          alt="instagram"
        />
        <p className="font-xs italic">
          This is not a real app, it is built for educational purposes only
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/'
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SignIn;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
}
