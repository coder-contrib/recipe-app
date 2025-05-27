import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, cuisine: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, cuisine);
  };

  const handleClear = () => {
    setQuery('');
    setCuisine('');
    onSearch('', '');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="cuisine-select"
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="French">French</option>
          <option value="American">American</option>
          <option value="Thai">Thai</option>
          <option value="Japanese">Japanese</option>
        </select>
        <button type="submit" className="search-btn">Search</button>
        <button type="button" onClick={handleClear} className="clear-btn">Clear</button>
      </form>
    </div>
  );
};

export default SearchBar;