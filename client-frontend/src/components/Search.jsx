import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Please enter a search query.');
      return;
    }
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Busca aquí"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full h-12 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="h-12 px-4 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default Search;


