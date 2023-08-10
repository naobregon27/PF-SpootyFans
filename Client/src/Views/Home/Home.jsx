import React, { useEffect, useState } from 'react';
import Cards from '../../Components/Cards/Cards';
import { useDispatch, useSelector } from 'react-redux';
import {allSongs, allPlayLists, allCategories} from "../../Redux/actions";
import Pagination from "../../Components/Pagination/Pagination"
import Filters from "./Filters/Filters";
import SearchBar from "./SearchBar/SearchBar";
import style from "./Home.module.css";
import Card_playlists from '../../Components/Card_playlists/Card_playlists';

function Home() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songsCopy);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(allSongs());
    
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = songs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={style.home_container}>
      <div className={style.search_options_container}>
        <SearchBar />
        <Filters />
      </div>
      <Cards songs={currentItems} />
      <div className={style.pagination_container}>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={songs.length}
          onPageChange={handlePageChange}
        />
      </div>
      <Card_playlists/>
    </div>
  );
}

export default Home;