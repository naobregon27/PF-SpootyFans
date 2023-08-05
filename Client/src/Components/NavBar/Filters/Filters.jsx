import style from "./Filters.module.css";
import {filterByGenre } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {

  const dispatch = useDispatch();

  const handleGenre = (event) => {
    dispatch(filterByGenre(event.target.value))
  }

    return (


    <div className={style.filters}>
              <div className={style.filter}>
        <select
          className={style.select}
          onChange={handleGenre}
        >
          <option value="">genres:</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Reggaetón">Reggaetón</option>
        </select>
      </div>
      
    </div>
  );
};

export default Filters;
