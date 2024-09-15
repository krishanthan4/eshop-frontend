import { useRouter } from 'next/navigation';
import React from 'react';

interface MainSearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function MainSearchBar({ searchText, setSearchText }: MainSearchBarProps) { // Accept props
const router = useRouter(); // Import useRouter to access query params
  // Function to hide search text when the mouse leaves the search bar area
  const onMouseEnterHideSearchText = () => {
    setSearchText(''); // Optionally clear the search text when mouse leaves
  };

  return (
    <div>
      {/* Main search bar */}
      <div onMouseLeave={onMouseEnterHideSearchText}
        className="flex ms-10 xl:w-[150%] lg:w-[130%] md:w-[150%]  w-full flex-row items-center justify-center">
        <input
          onChange={(e) => setSearchText(e.target.value)} // Update the search text on change
          value={searchText} // Bind the value to searchText state
          type="text"
          id="MainSearch"
          className="bg-[#292a2e] w-full text-gray-400 text-sm rounded-lg focus:bg-[#1d1e20] block  p-2.5 outline-none"
          placeholder="Search"
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              router.push(`/search?text=${searchText}`);
            }
          }} 
          required
        />
      </div>
      {/* Optional: View live texts div */}
    </div>
  );
}
