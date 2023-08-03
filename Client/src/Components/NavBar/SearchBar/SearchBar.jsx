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
    <div >
      <input type="text" value={searchTerm} onChange={handleChange}  placeholder=" find your fav song/artist..."/>
      <button onClick={handleSearch}>
          search
        </button>
    </div>
  );
}

export default SearchBar;