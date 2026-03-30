import React from 'react';
import Button from '../atoms/Button';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search for projects..." 
        className="search-input"
      />
      <Button variant="primary" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
