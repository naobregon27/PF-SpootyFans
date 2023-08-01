import React from "react";
import logo from "../../assets/logoSpotiFans.svg";
import style from "./Loading.module.css"

function LoadingPage() {
   return (
      <div className={style.logo_load_container}>
            <img className={style.logo_load} src={logo} alt={logo} />
      </div>
   );
}

export default LoadingPage;
