import React, { useEffect } from 'react';
import Cards from '../../Components/Cards/Cards';
import { useDispatch } from 'react-redux';
import {allSongs} from "../../Redux/actions"
// import style from "./Home.module.css";
// import NavBar from '../../Components/NavBar/NavBar';
// import SearchBar from '../../Components/SearchBar/SearchBar';
// import Filters from '../../Components/Filters/Filters';

function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allSongs())
  },[])

  return (
    <div>
      <Cards/>
    </div>
  );
}

export default Home;