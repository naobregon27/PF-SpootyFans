import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import style from "./SignUp.module.css";
import axios from "axios";
//import {useDispatch} from "react-redux";
//import { createUser } from '../../Redux/actions';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  //const dispatch = useDispatch();

  const navigate = useNavigate();

  
   const createUser = async (signUp) => {
    
      try {
        const response = await axios.post("http://localhost:3001/user/register", signUp);
        //console.log(response);
        alert("User created successfully");
      } catch (error) {
        console.error(error);
      }
    };
    const handleSubmit = async (event) => {

      event.preventDefault();
      const errors = validate();
      if (Object.keys(errors).length === 0) 
      {
  
  
       await createUser({username, email, password, isActive: true, isPremium:true });

       navigate("/login");
  
       // alert("User created successfully");
        //console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}, Is Checked: ${isChecked}`);
      } else {
        setErrors(errors);
      }
    };
  


  const validate = () => {
    const errors = {};
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!isChecked) {
      errors.isChecked = 'You must agree to the terms and conditions';
    }
    return errors;
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
    <h1>Register</h1>

    
      <label>
        
        <input className={style.datos} type="text" value={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
        {errors.username && <span>{errors.username}</span>}
      </label>
      <label>
      
        <input className={style.datos} type="email" value={email} placeholder="Email"onChange={(event) => setEmail(event.target.value)} />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <label>
        
        <input className={style.datos} type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        {errors.password && <span>{errors.password}</span>}
      </label>
      <label>
        
        <input className={style.datos} type="password" value={confirmPassword} placeholder="Confirm Password"onChange={(event) => setConfirmPassword(event.target.value)} />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </label>
      <label>
        <input type="checkbox" checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />
        I agree to the terms and conditions
        {errors.isChecked && <span>{errors.isChecked}</span>}
      </label>
      <button className={style.boton}  type="submit">Submit</button>
      <hr/>
      <NavLink to="/login">
<button className={style.boton}>want to log in?</button>
</NavLink>

    
</div>
    </div>
    </form>
  );
};

export default SignUp;

