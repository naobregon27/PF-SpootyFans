import { useState } from "react";
import style from "./Login.module.css";
import logo from "../../assets/logoSpotiFans.svg";
import { Link } from "react-router-dom";
import validation from "../../Components/Validation/Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SocialLoginOptions from "../../Components/SocialLoginOptions/SocialLoginOptions";

const Form = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setErrors(
      validation({ ...userData, [event.target.name]: event.target.value })
    );
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        userData
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <main className={style.mainContainer}>
      <img className={style.logo} src={logo}></img>
      <div className={style.log}>
        <div className={style.title_container}>
          <h1 className={style.title}>Login</h1>
          <Link to="/signup" className={style.to_signup}>
            or SignUp?
          </Link>
        </div>
        <form onSubmit={handleSubmit} className={style.form_container}>
          <label>
            <input
              className={style.datos}
              onChange={handleChange}
              value={userData.username}
              type="text"
              name="username"
              placeholder="Username"
            />
            <p>{errors.username}</p>
          </label>

          <label>
            <input
              className={style.datos}
              onChange={handleChange}
              value={userData.password}
              type="password"
              name="password"
              placeholder="Password"
            />
            <p>{errors.p}</p>
          </label>
          {/* <div>
            <input type="checkbox" name="rememberMe" id="rememberMe"></input>
            <label htmlFor="rememberMe"> Remember me</label>
          </div> */}
          <button className={style.boton} type="submit">
            Login
          </button>
        </form>
        <SocialLoginOptions />
      </div>
    </main>
  );
};

export default Form;
