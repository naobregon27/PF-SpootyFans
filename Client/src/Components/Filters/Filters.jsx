import style from "./Filters.module.css";

const Filters = () => {
    return (
    <div className={style.filters}>
              <div className={style.filter}>
        <select
          className={style.select}
        >
          <option value="">genres:</option>
          <option value="North America">pop</option>
          <option value="South America">rock</option>
          <option value="Africa">rap</option>
          <option value="Asia">jazz</option>
          <option value="Europe">country</option>
          <option value="Oceania">disco</option>
        </select>
      </div>
      
         <div className={style.filter}>
        <select className={style.select}>
          <option value="All" disabled selected>
            ordenar por:
          </option>
          <option value="population-+">recents</option>
          <option value="population+-">just songs</option>
          <option value="population+-">just artists</option>
        </select>
      </div>
      
      <div className={style.filter}>
        <select className={style.select} >
          <option value="All" disabled selected>
          alphabetical order:
          </option>
          <option className={style.option} value="name-a-z">
            alphabetical
          </option>
          <option value="name-z-a">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
