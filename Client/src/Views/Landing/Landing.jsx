import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

import { useDispatch } from 'react-redux';
import {allSongs} from "../../Redux/actions"

function Landing() {

  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allSongs())
  },[])
  
  return (
    <div className={style.landing_container}>
      <h1>Welcome</h1>
      <NavLink to="/home">
        <button>home</button>
      </NavLink>
    </div>
  )
}

export default Landing