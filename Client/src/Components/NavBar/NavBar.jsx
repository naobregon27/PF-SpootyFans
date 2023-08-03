import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.jpg";

function NavBar() {
  return (
    <div>
      <img className={styles.logo} src={logo} alt="" />
      <NavLink to="/login">
        <button className={styles.botonposta}>log in</button>
        <button className={styles.botonposta}>upload your song!</button>
        <button className={styles.botonposta}>start a new chat online</button>
      </NavLink>
    </div>
  );
}

export default NavBar;
