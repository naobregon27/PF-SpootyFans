import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allSongs } from "../../Redux/actions";

function Landing() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(allSongs());

      const el = document.getElementById("Card_Landing");
      const height = el.clientHeight;
      const width = el.clientWidth;

      const handleMouseMove = (e) => {
         const { layerX, layerY } = e;

         const yRotation = ((layerX - width / 2) / width) * 20;
         const xRotation = ((layerY - height / 2) / height) * 20;

         const string = `
        perspective(500px)
        scale(1.1)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)`;

         el.style.transform = string;
      };

      const handleMouseOut = () => {
         el.style.transform = `
        perspective(500px)
        scale(1)
        rotateX(0)
        rotateY(0)`;
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseout", handleMouseOut);

      return () => {
         el.removeEventListener("mousemove", handleMouseMove);
         el.removeEventListener("mouseout", handleMouseOut);
      };
   }, []);

   return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-transparent font-custom overflow-hidden text-white">
         <div
            id="Card_Landing"
            className="flex flex-col items-center justify-evenly h-[17rem] w-[30rem] backdrop-blur-[6px] bg-[#ffffff10] shadow-inner shadow-white rounded-[1rem] p-5 z-10">
            <div className="flex flex-col justify-center items-center">
               <h1 className="text-[3rem] leading-3 select-none">Welcome</h1>
               <h1 className="text-[2.5rem] select-none">fans of new music!</h1>
            </div>

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
      </div>
   );
}

export default Landing;
