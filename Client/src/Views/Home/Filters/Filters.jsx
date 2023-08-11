import { filterByGenre, allSongs, allCategories } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Filters = () => {
   const dispatch = useDispatch();

   const genres = useSelector((state) => state.categories);

   useEffect(() => {
      dispatch(allCategories());
   }, [dispatch]);

   const handleGenre = (event) => {
      event.target.value === "All"
         ? dispatch(allSongs())
         : dispatch(filterByGenre(event.target.value));
   };

   return (
      <div>
         <select
            className="flex flex-row justify-center items-center font-custom p-3 h-[3.1rem] w-[10rem] bg-transparent border rounded-[5rem] outline-"
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
      </div>
   );
};

export default Filters;
