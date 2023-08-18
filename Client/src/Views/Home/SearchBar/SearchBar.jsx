import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findSong, findSongByArtist } from "../../../Redux/actions";
import { IconSearch } from '@tabler/icons-react';

function SearchBar() {
   const dispatch = useDispatch();

   const [searchTerm, setSearchTerm] = useState("");

   const handleChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const handleSearch = () => {
      dispatch(findSong(searchTerm));
      dispatch(findSongByArtist(searchTerm));
   };

   return (
      <div className="flex flex-row w-fit justify-center h-fit">
         <div className="flex flex-row justify-around rounded-[5rem] h-fit w-fit bg-[#ffffff10] backdrop-blur-[7px] border border-[#ffffff10]">
            <input
				className="w-[15rem] h-[3rem] p-5 bg-transparent text-white focus:outline-none"
               type="text"
               value={searchTerm}
               onChange={handleChange}
               placeholder=" find your fav song/artist..."
            />
            <button className="flex justify-center items-center rounded-[100%] w-[3rem] h-[3rem] duration-[.3s]" onClick={handleSearch}><IconSearch size="1.9rem" color="white"/></button>
         </div>
      </div>
   );
}

export default SearchBar;
