import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import faker from 'faker';

import Story from './story';

export interface ProfileType {
  id: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
  dob: Date;
  phone: string;
  address: Faker.Address;
  website: string;
  company: Faker.Company;
}

const Stories = () => {
  const { data: session, status } = useSession();
  const [suggestions, setSuggestions] = useState<ProfileType[]>([]);

  useEffect(() => {
    const fakeSuggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i
    }));

    setSuggestions(fakeSuggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
