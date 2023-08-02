import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}, Is Checked: ${isChecked}`);
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
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

    <div>
        
    <h1>Register</h1>

    <Link to="/login">
        <button>Back to login</button>
         </Link>    

    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        {errors.name && <span>{errors.name}</span>}
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {errors.password && <span>{errors.password}</span>}
      </label>
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </label>
      <label>
        <input type="checkbox" checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />
        I agree to the terms and conditions
        {errors.isChecked && <span>{errors.isChecked}</span>}
      </label>
      <button type="submit">Submit</button>
    </form>

    </div>
  );
};

export default SignUp;