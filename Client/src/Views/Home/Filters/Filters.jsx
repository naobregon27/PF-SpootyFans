import { filterByGenre, allSongs, allCategories, allSongsRating, resetSongsCopy } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Filters = () => {
   const dispatch = useDispatch();

   const genres = useSelector((state) => state.categories);
   const [rating, setRating] = useState(["All", 5, 4, 3, 2, 1])

   const [selectedGenre, setSelectedGenre] = useState("All");
   const [selectedRating, setSelectedRating] = useState("All");

   const handleGenre = (event) => {
      const newSelectedGenre = event.target.value;
      setSelectedGenre(newSelectedGenre);
      if (newSelectedGenre === "All") {
         if (selectedRating !== "All") {
            dispatch(resetSongsCopy());
            dispatch(allSongsRating(selectedRating));
         } else { dispatch(allSongs()); }
      } else {
         dispatch(resetSongsCopy());
         dispatch(filterByGenre(newSelectedGenre));
         if (selectedRating !== "All") {
            dispatch(allSongsRating(selectedRating));
         }
      }
   };

   const handleRating = (event) => {
      const newSelectedRating = event.target.value;
      setSelectedRating(newSelectedRating);
      if (newSelectedRating === "All") {
         if (selectedGenre !== "All") {
            dispatch(resetSongsCopy());
            dispatch(filterByGenre(selectedGenre));
         }else { dispatch(allSongs()); }
      } else {
         dispatch(resetSongsCopy());
         dispatch(allSongsRating(newSelectedRating));
         if (selectedGenre !== "All") {
            dispatch(filterByGenre(selectedGenre));
         }
      }
   };

   useEffect(() => {
      dispatch(allCategories());
   }, []);
   return (
      <div className=" flex flex-row items-center gap-5 rounded-[5rem]">
         
         <select
            className= "flex flex-row justify-center items-center font-custom p-3 h-[3.1rem] w-[10rem] bg-[#00000020] backdrop-blur-[7px] border border-[#ffffff20] cursor-pointer text-white rounded-[5rem] outline-none"
            onChange={handleGenre}>
            <option selected disabled>Select Genre</option>
            {genres.map((genre) => {
               return (
                  <option className="text-[.9rem] text-black" key={genre.name} value={genre.name}>
                     {genre.name}
                  </option>
               );
            })}
         </select>
         
         <select
            className="flex flex-row justify-center items-center font-custom p-3 h-[3.1rem] w-[10rem] bg-[#00000020] backdrop-blur-[7px] border border-[#ffffff20] cursor-pointer text-white rounded-[5rem] outline-none"
            onChange={handleRating}>
            <option selected disabled>Filter by Rating</option>
            {rating.map((rate) => {
               return (
                  <option className="text-[.9rem] text-black"key={rate} value={rate}>
                     stars: {rate}
                  </option>
               );
            })}
         </select>
      
      </div>
      
   );
};

export default Filters;