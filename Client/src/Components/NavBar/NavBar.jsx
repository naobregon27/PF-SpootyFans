import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoSpotiFans.svg";
import style from "./NavBar.module.css";
import { allSongs } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRerender = () => {
    dispatch(allSongs());
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className={style.navbar_container}>
      <img
        className={style.logo_nav}
        src={logo}
        alt="SpotyFans logo"
        onClick={() => navigate("home")}
      />
      <NavLink to="/home">
        <button className={style.botonc} onClick={handleRerender}>
          Home
        </button>
      </NavLink>
      <NavLink to="/create">
        <button className={style.botonc}>Upload</button>
      </NavLink>
      <NavLink to="/">
        <button className={style.botonc} onClick={handleClickLogout}>
          Logout
        </button>
      </NavLink>
      <NavLink to="/playlist">
         <button className={style.botonc}>New playlist</button>
       </NavLink>
    </div>
  );
}

export default NavBar;
