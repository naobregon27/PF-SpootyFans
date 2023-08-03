import { useState } from "react";
import style from "./Login.module.css";
import logo from "../../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import validation from "../../Components/Validation/Validation";

const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setErrors(validation({ ...userData, [event.target.name]: event.target.value }));
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // llamar a la función de inicio de sesión del backend (userLogin)
    try {
      const token = await login(userData);
      // almaceno el token en el local storage y redirigo al usuario 
      console.log("Token received:", token);
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
      <label htmlFor="email"></label>
      <input className={style.datos}
        onChange={handleChange}
        value={userData.email}
        type="text"
        name="email"
        placeholder="Username or email"
      />
      <p>{errors.email}</p>
    
      <label htmlFor="password"></label>
      <input className={style.datos}
        onChange={handleChange}
        value={userData.password}
        type="password"
        name="password"
        placeholder="Password"
      />
      <p>{errors.p}</p>

      <div class="remember-content">
      <input type="checkbox" name="rememberMe" id="rememberMe" ></input>
      <label for="rememberMe" class="remember-label"> Remember me</label>
      </div>

      <button className={style.boton} onClick={handleSubmit} 
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
