import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Main Top Navigation Bar Component
const TopNavBar = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes
  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log('Search term:', value);
    // Add your search logic here later
  };

  return (
    <div className="flex items-center justify-center p-4 bg-[#343264] border-b border-[#8D8DC7]">
      {/* Centered Search Bar */}
      <div className="w-full max-w-md">
        <div className="relative">
          {/* Search Icon */}
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8D8DC7]" 
            size={20} 
          />
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-[#8D8DC7]/20 border border-[#8D8DC7] rounded-lg pl-10 pr-4 py-2 text-white placeholder-[#BEBEE0] focus:outline-none focus:border-[#BEBEE0] transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;