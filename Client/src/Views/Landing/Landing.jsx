import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allSongs } from "../../Redux/actions";

function Landing() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(allSongs());
   }, []);

   return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-transparent font-custom overflow-hidden text-white">

         <div className="flex flex-col items-center justify-center h-[17rem] w-[30rem] backdrop-blur-[10px] bg-[#ffffff10] shadow-inner shadow-white rounded-[1rem] p-5 z-10">

            <h1 className="text-[2.5rem] leading-3 select-none">Welcome</h1>
            <h1 className="text-[2.5rem] select-none">fans of new music!</h1>

            <div className="grid grid-cols-3">
               <NavLink
                  to="/login"
                  className="flex justify-center px-3 py-1 border rounded-[5rem] text-black bg-white hover:bg-transparent hover:text-white hover:scale-[1.1] duration-300">
                  <button>Login</button>
               </NavLink>

               <p className=" flex items-center justify-center"> -or- </p>

               <NavLink
                  to="/signup"
                  className="flex justify-center px-3 py-1 border rounded-[5rem] text-black bg-white hover:bg-transparent hover:text-white hover:scale-[1.1] duration-300">
                  <button>Signup</button>
               </NavLink>
            </div>
         </div>
         <img className="w-70 max-ms:hidden" src="" alt="" />
      </div>
   );
}

export default Landing;
