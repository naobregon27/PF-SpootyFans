import { filterByGenre, allSongs, allCategories, allSongsRating } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Filters = () => {
   const dispatch = useDispatch();

   const genres = useSelector((state) => state.categories);
   const [rating, setRating] = useState(["All", 5, 4, 3, 2, 1])

   useEffect(() => {
      dispatch(allCategories());
   }, [dispatch]);

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

   return (
      <div class=" flex flex-row items-center rounded-[5rem]">
         
         <select
            className= "bg-white flex flex-row justify-center items-center font-custom p-3 h-[3.1rem] w-[10rem] bg-transparent border rounded-[5rem] outline-none"
            onChange={handleGenre}>
            <option selected disabled>Select Genre</option>
            {genres.map((genre) => {
               return (
                  <option className="text-[.9rem]" key={genre.name} value={genre.name}>
                     {genre.name}
                  </option>
               );
            })}
         </select>
         
         <select
            className="bg-white flex flex-row justify-center items-center font-custom p-3 h-[3.1rem] w-[10rem] bg-transparent border rounded-[5rem] outline-none"
            onChange={handleRating}>
            <option selected disabled>Filter by Rating</option>
            {rating.map((rate) => {
               return (
                  <option className="text-[.9rem]"key={rate} value={rate}>
                     stars: {rate}
                  </option>
               );
            })}
         </select>
      
      </div>
      
   );
};

export default Filters;
