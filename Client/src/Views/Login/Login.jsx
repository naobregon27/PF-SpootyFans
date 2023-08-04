import React, { useState } from "react";
import axios from "axios";
import style from "./Login.module.css";
import logo from "../../assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import validation from "../../Components/Validation/Validation";

const Form = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setErrors(validation({ ...userData, [event.target.name]: event.target.value }));
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // llamar a la función de inicio de sesión del backend (userLogin)
    try {
      const response = await axios.post("http://localhost:3001/user/login", userData, {
        headers: {
          "x-access-token": localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6ImNhcmxhX21hcnRpbmV6IiwiZW1haWwiOiJjYXJsYW1hcnRpbmV6Nzg5QGV4YW1wbGUuY29tIiwiaXNBY3RpdmUiOnRydWUsImlzUHJlbWl1bSI6ZmFsc2UsImlhdCI6MTY5MTEwNjcyMiwiZXhwIjoxNjkxMTkzMTIyfQ.AH6qwnxkzpafMNEqpEHpcoUO4hIkgWfcsuBVCH_Skjw"), // Agregar el token al encabezado
        },
      });
      if (response.status === 200) {
      const token = response.data.token;
      // almaceno el token en el local storage y redirigo al usuario 
      console.log("Token received:", token);

        // Redirigir al usuario a la página de inicio
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
  <form onSubmit={handleSubmit} className={style.mainContainer}>
    <div>

    <img className={style.logo}src={logo}></img>

    <NavLink to="/home">
    <button className={style.boton}>contact us</button>
    <button className={style.boton}>Back to Home!</button>
        
      </NavLink>
     <hr/>
     <div className={style.log}>
        <h2>welcome back!</h2>
      <label htmlFor="username"></label>
      <input className={style.datos}
        onChange={handleChange}
        value={userData.username}
        type="text"
        name="username"
        placeholder="Username or username"
      />
      <p>{errors.username}</p>
    
      <label htmlFor="password"></label>
      <input className={style.datos}
        onChange={handleChange}
        value={userData.password}
        type="password"
        name="password"
        placeholder="Password"
      />
      <p>{errors.p}</p>

      <div >
      <input type="checkbox" name="rememberMe" id="rememberMe" ></input>
      <label htmlFor="rememberMe" > Remember me</label>
      </div>

      <button className={style.boton}  
       type="submit">LOG IN</button>
<hr/>
<NavLink to="/signup">
<button className={style.boton}>want to sign up?</button>
</NavLink>
    </div>  </div>
  </form>
);


};

export default Form;