import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findSong } from "../../../Redux/actions";
import { IconSearch } from '@tabler/icons-react';

function SearchBar() {
   const dispatch = useDispatch();

   const [searchTerm, setSearchTerm] = useState("");

   const handleChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const handleSearch = () => {
      dispatch(findSong(searchTerm));
   };

   return (
      <div className="flex flex-row w-fit justify-center h-fit">
         <div className="flex flex-row justify-around rounded-[5rem] h-fit w-fit bg-white border">
            <input
				className=" border border-black w-[15rem] h-[3rem] rounded-l-[5rem] border-none focus:outline-none pl-5"
               type="text"
               value={searchTerm}
               onChange={handleChange}
               placeholder=" find your fav song/artist..."
            />
            <button className="flex justify-center items-center relative rounded-[100%] w-[3rem] h-[3rem] duration-[.3s]" onClick={handleSearch}><IconSearch size="1.9rem" color="black"/></button>
         </div>
      </div>
   );
}

export default SearchBar;
