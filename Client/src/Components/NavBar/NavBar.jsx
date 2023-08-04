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
         <SearchBar/>
         <NavLink to="/home">
            <button onClick={handleRerender}>home</button>
         </NavLink>
         <NavLink to="/login">
            <button>log in</button>
         </NavLink>
      </div>
   );
}

export default NavBar;
