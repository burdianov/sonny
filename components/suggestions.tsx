/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react';
import faker from 'faker';
import { ProfileType } from './stories';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<ProfileType[]>([]);

  useEffect(() => {
    const fakeSuggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i
    }));
    setSuggestions(fakeSuggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full p-[2px]"
            src={profile.avatar}
            alt="avatar"
          />

          <div className="flex-1 ml-4 mr-3">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400 truncate">
              Works at {profile.company.name}
            </h3>
          </div>

          <button className="text-blue-400 text-xs font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
