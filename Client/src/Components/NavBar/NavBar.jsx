import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { allSongs } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import {IconArrowDown} from '@tabler/icons-react'

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
      <div className="absolute z-[999] h-0 w-screen max-w-full bg-white font-custom">
         <div className="flex flex-col justify-between items-center relative h-[5rem] top-[-3.4rem] hover:top-0 hover:bg-black hover:text-white hover:shadow-2xl duration-[.3s]">
            {/* <img
               className=""
               src={logo}
               alt="SpotyFans logo"
               onClick={() => navigate("home")}
            /> */}
            <div className="flex justify-around items-center font-custom w-screen mt-4">
               <NavLink to="/home">
                  <button
                     className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]"
                     onClick={handleRerender}>
                     Home
                  </button>
               </NavLink>

               <NavLink to="/create">
                  <button className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]">
                     Upload
                  </button>
               </NavLink>

               <NavLink to="/playlist">
                  <button className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]">
                     New playlist
                  </button>
               </NavLink>

               <NavLink to="/profile">
                  <button className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]">
                     Profile
                  </button>
               </NavLink>

               <NavLink to="/">
                  <button
                     className="border-black border-b-2 hover:border-white hover:border-b-2 duration-[.3s]"
                     onClick={handleClickLogout}>
                     Logout
                  </button>
               </NavLink>
            </div>
				<div className="flex justify-center items-center w-full h-fit cursor-pointer">
					<IconArrowDown/>
               {/* HOVER TO OPEN MENU
					<IconArrowDown/> */}
				</div>
         </div>
      </div>
   );
}

export default NavBar;
