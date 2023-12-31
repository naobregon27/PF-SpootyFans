import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { allSongs, setCurrentSongUrls } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import {
  IconArrowDown,
  IconLogout,
  IconUserCircle,
  IconPlaylistAdd,
  IconCloudUpload,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import jwt_decode from "jwt-decode";

function NavBar() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const token = localStorage.getItem('token')
   const { isAdmin } = jwt_decode(token)

   const handleRerender = () => {
      dispatch(allSongs());
   };

   const handleClickLogout = () => {
      localStorage.removeItem("token");
      dispatch(setCurrentSongUrls([]));
   };

   return (
     <div className="absolute z-[999] h-0 w-screen max-w-full bg-white font-custom">
       <div className="flex flex-col justify-between items-center relative h-[5rem] top-[-3.4rem] hover:top-0 bg-[#ffffff10] backdrop-blur-[7px] text-white hover:shadow-2xl duration-[.3s]">
         {/* <img
               className=""
               src={logo}
               alt="SpotyFans logo"
               onClick={() => navigate("home")}
            /> */}
         <div className="flex justify-around items-center font-custom w-screen mt-4">
           <NavLink to="/home">
             <button
               className="flex flex-row border-transparent border-b-2 text-[1.3rem] hover:border-white hover:border-b-2 duration-[.3s]"
               onClick={handleRerender}
             >
               Home<p className="opacity-0">o</p>
               <IconHome />
             </button>
           </NavLink>

           <NavLink to="/create">
             <button className="flex flex-row border-transparent border-b-2 text-[1.3rem] hover:border-white hover:border-b-2 duration-[.3s]">
               Upload<p className="opacity-0">o</p>
               <IconCloudUpload />
             </button>
           </NavLink>

           <NavLink to="/playlist">
             <button className="flex flex-row border-transparent border-b-2 text-[1.3rem] hover:border-white hover:border-b-2 duration-[.3s]">
               New playlist<p className="opacity-0">o</p>
               <IconPlaylistAdd />
             </button>
           </NavLink>

           <NavLink to="/profile">
             <button className="flex flex-row border-transparent border-b-2 text-[1.3rem] hover:border-white hover:border-b-2 duration-[.3s]">
               Profile<p className="opacity-0">o</p>
               <IconUserCircle />
             </button>
           </NavLink>

           {isAdmin && <a href="http://dashboard-admin-pf.vercel.app">
             <button className="flex flex-row border-transparent border-b-2 text-[1.3rem] hover:border-white hover:border-b-2 duration-[.3s]">
               Dashboard<p className="opacity-0">o</p>
               <IconSettings />
             </button>
           </a>}

           <NavLink to="/">
             <button
               className="flex flex-row border-transparent border-b-2 text-[1.3rem] hover:border-white hover:border-b-2 duration-[.3s]"
               onClick={handleClickLogout}
             >
               Logout<p className="opacity-0">o</p>
               <IconLogout />
             </button>
           </NavLink>
         </div>
         <div className="flex justify-center items-center w-full h-fit cursor-pointer">
           <IconArrowDown />
           {/* HOVER TO OPEN MENU
					<IconArrowDown/> */}
         </div>
       </div>
     </div>
   );
}

export default NavBar;
