import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { allSongs } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { IconArrowDown } from "@tabler/icons-react";

function NavBar() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleRerender = () => {
      dispatch(allSongs());
   };

   const handleClickLogout = () => {
      localStorage.removeItem("token");
   };

   return (
      <div className="absolute z-[999] h-0 bg-white">
         <div className="flex flex-col justify-between items-center relative h-[5rem] top-[-3.4rem] hover:top-0 hover:bg-black hover:text-white hover:shadow-2xl duration-[.3s]">
            <div className="flex justify-around items-center font-custom w-screen mt-4">
               {/* <img
                  className="w-[3rem]"
                  src={logo}
                  alt="SpotyFans logo"
                  onClick={() => navigate("home")}
               /> */}

               <NavLink
                  className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]"
                  to="/home">
                  <button onClick={handleRerender}>Home</button>
               </NavLink>

               <NavLink
                  className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]"
                  to="/create">
                  <button>Upload</button>
               </NavLink>

               <NavLink
                  className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]"
                  to="/playlist">
                  <button>New playlist</button>
               </NavLink>

               <NavLink
                  className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]"
                  to="/profile">
                  <button>Profile</button>
               </NavLink>

               <NavLink to="/">
                  <button
                     className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]"
                     onClick={handleClickLogout}>
                     {" "}
                     <div className="">Logout</div>
                  </button>
               </NavLink>
            </div>

            <div className="flex justify-center items-center w-full h-fit cursor-pointer">
               <IconArrowDown />
            </div>
         </div>
      </div>
   );
}

export default NavBar;
