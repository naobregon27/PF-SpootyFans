import React from 'react';
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css"

function Landing() {
  return (
    <div className={style.landing_container}>
      <h1>Wellcome</h1>
      <NavLink to="/home">
        <button>home</button>
      </NavLink>
    </div>
  )
}

export default Landing