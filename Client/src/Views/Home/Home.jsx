import React from 'react';
import style from "./Home.module.css";
import NavBar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Filters from '../../Components/Filters/Filters';

function Home() {
  return (
    <div>
      <NavBar  />
      <SearchBar />
      <Filters />
    </div>

    
  );
}

export default Home;