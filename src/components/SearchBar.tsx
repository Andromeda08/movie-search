import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC<{ searchFn: any }> = ({ searchFn }) => {
  const [ filter, _setFilter ] = useState<string>();
  
  return (
    <form className='searchBar'>
      <input
        type='text'
        placeholder='Search to find movies'
        onChange={(e) => { _setFilter(e.target.value )}}
      />
      <button onClick={(e) => { 
        e.preventDefault();
        searchFn(filter);
      }}>
        <FaSearch />
      </button> 
    </form>
  );
}

export {
  SearchBar
};