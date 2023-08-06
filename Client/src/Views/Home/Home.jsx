import React, { useEffect, useState } from 'react';
import Cards from '../../Components/Cards/Cards';
import { useDispatch, useSelector } from 'react-redux';
import {allSongs} from "../../Redux/actions";
import Pagination from "../../Components/Pagination/Pagination"

function Home() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs); 
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