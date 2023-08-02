import { useState } from "react";
import style from "./Login.module.css";
import logo from "../../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import validation from "../../Components/Validation/Validation";

const Form = ({login}) => {
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setErrors(validation({...userData,[event.target.name]: event.target.value }))
    setUserData({ ...userData,[event.target.name]: event.target.value,})
};


const handleSubmit = (event)=>{
    event.preventDefault();
    login(userData)
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
        <h2>welcome!</h2>
      <label htmlFor="email"></label>
      <input
        onChange={handleChange}
        value={userData.email}
        type="text"
        name="email"
        placeholder="Phone Number, username or email"
      />
      <p>{errors.email}</p>
    
      <label htmlFor="password"></label>
      <input
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
<button className={style.boton}>want to sign up?</button>
       
    </div>  </div>
  </form>
);


};

export default Form;
