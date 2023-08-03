import React, { useState } from 'react';
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.searchbar}>
      <input type="text" value={searchTerm} onChange={handleSearch}  placeholder=" find your fav song/artist..."/>
      <button  className={styles.buscar}>
          🔍
        </button>
    </div>
  );
}

export default SearchBar;