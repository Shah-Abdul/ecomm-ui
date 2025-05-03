import React, { useState } from 'react';
import '../ProductStyle/SearchFilter.css';

const SearchFilter = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchChange(inputValue); // Only call parent when button is clicked
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchFilter;
