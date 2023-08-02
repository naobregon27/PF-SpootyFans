import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.jpg"

function NavBar() {
    return (
      <div>
         <img className={styles.logo} src={logo} alt="" />
<NavLink to="/login">
        <button className={styles.botonposta}>subi tu tema!</button>
        <button className={styles.botonposta}>abri tu nuevo chat en linea</button>
      </NavLink>
      </div>
  
      
    );
  }
  
  export default NavBar;