import style from "./Filters.module.css";
import {filterByGenre, allSongs, allCategories} from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Filters = () => {

  const dispatch = useDispatch();

  const genres = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(allCategories())
  },[dispatch])

  const handleGenre = (event) => {
    event.target.value === "All" ? dispatch(allSongs()) 
    : dispatch(filterByGenre(event.target.value))
  }

    return (
      <div className={style.filters}>
        <div className={style.filter}>
          <select className={style.select} onChange={handleGenre}>
            <option value="">Select Genre</option>
            {genres.map((genre) => {
                return(
                  <option key={genre.name} value={genre.name}>
                  {genre.name}
                  </option>
                )
            })}
          </select>
        </div>
      </div>
    );
};

export default Filters;
