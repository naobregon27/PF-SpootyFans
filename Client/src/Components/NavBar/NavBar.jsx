import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoSpotiFans.svg";
import style from "./NavBar.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { allSongs } from "../../Redux/actions";

function NavBar() {

   const dispatch = useDispatch();

   const handleRerender = () => {
      dispatch(allSongs())
   }
   
   return (
     <div className={style.navbar_container}>
       <img className={style.logo_nav} src={logo} alt="" />
       <SearchBar />
       <NavLink to="/home">
         <button className={style.botonc} onClick={handleRerender}>
           home
         </button>
       </NavLink>
       <NavLink to="/login">
         <button className={style.botonc}>Log in</button>
       </NavLink>
       <NavLink to="/create">
         <button className={style.botonc}>Upload</button>
       </NavLink>
       
     </div>
   );
}

export default NavBar;
