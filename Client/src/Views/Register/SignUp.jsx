import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ballet from "../../assets/ballet.png";
import runner from "../../assets/runner.png";
import SocialLoginOptions from "../../Components/SocialLoginOptions/SocialLoginOptions";
import { spotyFansApi } from "../../../services/apiConfig";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const createUser = async (signUp) => {
    try {
      const response = await spotyFansApi.post("/user/register", signUp);
      alert("User created successfully");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      await createUser({
        username,
        email,
        password,
      });

      navigate("/login");
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!username) {
      errors.username = "Username is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    // if (!isChecked) {
    //   errors.isChecked = "You must agree to the terms and conditions";
    // }
    return errors;
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-transparent font-custom overflow-hidden text-white">
    
      <main className="flex flex-col justify-center items-center backdrop-blur-[6px] bg-[#ffffff10] shadow-inner shadow-white rounded-[2rem]">

        <div className="flex flex-col justify-center items-center min-w-[22rem] w-[25rem] h-fit max-md:backdrop-blur-[10px] shadow-xl rounded-[2rem] z-50">
          <div>
            <h1 className="text-[3.5rem] mb-2 mt-3 tracking-[2px]">Sign Up</h1>
          </div>

          <form
            className="flex flex-col justify-center items-center "
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border bg-[#ffffff05] w-[20rem] h-[1rem] rounded-[5rem] p-5 placeholder:text-[#ffffff70] text-white focus:scale-[1.1] focus:bg-[#ffffff10] focus:shadow-[0px_13px_36px_0px_#000] duration-[.3s] outline-none"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
              {errors.username && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.username}
                </p>
              )}
            </label>

            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border bg-[#ffffff05] w-[20rem] h-[1rem] rounded-[5rem] p-5 placeholder:text-[#ffffff70] text-white focus:scale-[1.1] focus:bg-[#ffffff10] focus:shadow-[0px_13px_36px_0px_#000] duration-[.3s] outline-none"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.email}
                </p>
              )}
            </label>

            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border bg-[#ffffff05] w-[20rem] h-[1rem] rounded-[5rem] p-5 placeholder:text-[#ffffff70] text-white focus:scale-[1.1] focus:bg-[#ffffff10] focus:shadow-[0px_13px_36px_0px_#000] duration-[.3s] outline-none"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.password}
                </p>
              )}
            </label>

            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border bg-[#ffffff05] w-[20rem] h-[1rem] rounded-[5rem] p-5 placeholder:text-[#ffffff70] text-white focus:scale-[1.1] focus:bg-[#ffffff10] focus:shadow-[0px_13px_36px_0px_#000] duration-[.3s] outline-none"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.confirmPassword}
                </p>
              )}
            </label>
            <button
              className="flex flex-col justify-center items-center bg-transparent border w-[7rem] h-[2.3rem] rounded-[5rem] mt-2 mb-5 hover:scale-[1.1] hover:bg-white hover:text-black duration-[.3s]"
              type="submit"
            >
              Submit
            </button>
          </form>

          <p className="text-[.9rem]">or sign up with</p>
          <SocialLoginOptions />

          <p className="m-[1rem]">
            Not the first time here?
            <NavLink
              className="ml-5 text-[1.2rem] animate-multicolor_text duration-[.3s]"
              to="/login"
            >
              Login
            </NavLink>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
