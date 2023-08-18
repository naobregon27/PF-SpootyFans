import { filterByGenre, allSongs, allCategories, allSongsRating } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Filters = () => {
   const dispatch = useDispatch();

   const genres = useSelector((state) => state.categories);
   const [rating, setRating] = useState(["All", 5, 4, 3, 2, 1])

   const handleGenre = (event) => {
      event.target.value === "All"
         ? dispatch(allSongs())
         : dispatch(filterByGenre(event.target.value));
   };

   const handleRating = (event) => {
      event.target.value === "All"
         ? dispatch(allSongs())
         :  dispatch(allSongsRating(event.target.value));
   };

   useEffect(() => {
      dispatch(allCategories());
   }, []);

   return (
      <div class=" flex flex-row items-center gap-5 rounded-[5rem]">
         
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
