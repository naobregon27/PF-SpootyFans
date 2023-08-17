import { useState } from "react";
import { NavLink } from "react-router-dom";
import validation from "../../Components/Validation/Validation";
import { useNavigate } from "react-router-dom";
import SocialLoginOptions from "../../Components/SocialLoginOptions/SocialLoginOptions";
import { spotyFansApi } from "../../../services/apiConfig";

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
         const response = await spotyFansApi.post("/user/login", userData);

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
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-transparent font-custom overflow-hidden text-white">
         <div className="flex flex-col justify-center items-center min-w-[22rem] w-[25rem] h-[30rem] backdrop-blur-[6px] bg-[#ffffff10] shadow-inner shadow-white rounded-[2rem] hover:backdrop-blur-[10px] hover:scale-[1.05] duration-[.3s]">
            <h1 className="text-[3.5rem] mb-2 tracking-[2px]">Log in</h1>
            <form
               className="flex flex-col justify-center items-center"
               onSubmit={handleSubmit}>
               <label className="flex flex-col justify-center items-center pb-[1.4rem]">
                  <input
                     className="border bg-[#ffffff05] w-[20rem] h-[1rem] rounded-[5rem] p-5 placeholder:text-[#ffffff70] text-white focus:bg-transparent"
                     onChange={handleChange}
                     value={userData.username}
                     type="text"
                     name="username"
                     autoComplete="off"
                     placeholder="Username..."
                  />
                  <p className="text-[.9rem] text-red-600 mt-[.3rem]">
                     {errors.username}
                  </p>
               </label>

               <label className="flex flex-col justify-center items-center pb-[1rem]">
                  <input
                     className="border bg-[#ffffff05] w-[20rem] h-[1rem] rounded-[5rem] p-5 placeholder:text-[#ffffff70] text-white"
                     onChange={handleChange}
                     value={userData.password}
                     type="password"
                     name="password"
                     autoComplete="off"
                     placeholder="Password..."
                  />
                  <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                     {errors.p}
                  </p>
               </label>
               {/* <div>
            <input type="checkbox" name="rememberMe" id="rememberMe"></input>
            <label htmlFor="rememberMe"> Remember me</label>
          </div> */}

               {Object.keys(errors).length === 0 ? (
                  <button
                     className="flex flex-col justify-center items-center bg-transparent border w-[7rem] h-[2.3rem] rounded-[5rem] mt-2 mb-5 hover:scale-[1.1] hover:bg-white hover:text-black  duration-[.3s]"
                     type="submit">
                     Log in
                  </button>
               ) : (
                  <button
                     className="flex flex-col justify-center items-center bg-transparent border w-[7rem] h-[2.3rem] rounded-[5rem] mt-2 mb-5 hover:blur-sm cursor-not-allowed duration-[.3s]"
                     type="submit">
                     Log in
                  </button>
               )}
            </form>
            <p className="text-[.9rem]">or Sign In with</p>
            <SocialLoginOptions />
            <p className="m-[1rem]">
               Don't have an account?
               <NavLink
                  className="ml-5 text-[1.2rem] animate-multicolor_text"
                  to="/signup">
                  Sign Up
               </NavLink>
            </p>
         </div>
      </div>
   );
};

export default Form;
