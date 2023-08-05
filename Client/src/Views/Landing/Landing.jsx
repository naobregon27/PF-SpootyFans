import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

import { useDispatch } from "react-redux";
import { allSongs } from "../../Redux/actions";

function Landing() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(allSongs());
   }, []);

   return (
      <div className={style.landing_container}>
         <div className={style.title_container}>
            <h1 className={style.primary_title_landing}>Welcome</h1>
            <h1 className={style.secondary_title_landing}>
               fans of new music!
            </h1>
         </div>
         <div className={style.button_home_container}>
            <NavLink to="/home">
               <button className={style.button_to_home}>home &gt;&gt;</button>
            </NavLink>
         </div>
      </div>
   );
}

export default Landing;
