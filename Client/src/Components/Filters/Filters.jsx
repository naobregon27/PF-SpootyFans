import style from "./Filters.module.css";

const Filters = () => {
    return (
    <div className={style.filters}>
              <div className={style.filter}>
        <select
          className={style.select}
        >
          <option value="">generos:</option>
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
          <option value="population-+">recientes</option>
          <option value="population+-">alfabeticamente</option>
          <option value="population+-">por artista</option>
        </select>
      </div>
      
      <div className={style.filter}>
        <select className={style.select} >
          <option value="All" disabled selected>
            orden alfabético:
          </option>
          <option className={style.option} value="name-a-z">
            Paises de la A-Z
          </option>
          <option value="name-z-a">Paises de la Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
