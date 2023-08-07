import React, { useEffect, useState } from 'react';
import Cards from '../../Components/Cards/Cards';
import { useDispatch, useSelector } from 'react-redux';
import {allSongs} from "../../Redux/actions";
import Pagination from "../../Components/Pagination/Pagination"
import Filters from "./Filters/Filters";

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
    <div>
      <Filters />
      <Cards songs={currentItems}/>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={songs.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;