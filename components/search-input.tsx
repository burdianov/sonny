import { SearchIcon } from '@heroicons/react/outline';

const SearchInput = () => {
  return (
    <div className="max-w-xs">
      <div className="relative mt-1 p-3 rounded-md">
        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          className="transition bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-gray-900 rounded-md"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
