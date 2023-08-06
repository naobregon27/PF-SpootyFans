import style from "./Filters.module.css";
import {filterByGenre, allSongs} from "../../../Redux/actions";
import { useDispatch } from "react-redux";

const Filters = () => {

  const dispatch = useDispatch();

  const handleGenre = (event) => {
    event.target.value === "All" ? dispatch(allSongs()) 
    : dispatch(filterByGenre(event.target.value))
  }

    return (


    <div className={style.filters}>
              <div className={style.filter}>
        <select
          className={style.select}
          onChange={handleGenre}
        >
          <option value="">genres:</option>
          <option value="All">All</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="Electronic">Electrónica</option>
          <option value="Reggaeton">Reggaetón</option>
        </select>
      </div>
      
    </div>
  );
};

export default Filters;
