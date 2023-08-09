import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {findSong} from "../../../Redux/actions"
import styles from "./SearchBar.module.css";

function SearchBar() {

  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    dispatch(findSong(searchTerm))
  }

  return (
    <div className={styles.searchbar}>
      <input className={styles.input} type="text" value={searchTerm} onChange={handleChange}  placeholder=" find your fav song/artist..."/>
      <button className={styles.buscar} onClick={handleSearch}>
      🔍
        </button>
    </div>
  );
}

export default SearchBar;