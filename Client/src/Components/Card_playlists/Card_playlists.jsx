import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSongs } from "../../Redux/actions";
import { useNavigate, NavLink } from "react-router-dom";
import { spotyFansApi } from "../../../services/apiConfig";
import { IconCircleXFilled } from "@tabler/icons-react";

const Card_playlists = () => {
   const navigate = useNavigate();
   const songs = useSelector((state) => state.songsCopy);
   const dispatch = useDispatch();
   const [playlists, setPlaylists] = useState([]);
   const [userData, setUserData] = useState([]);

   const fetchPlaylists = async () => {
      try {
         const token = localStorage.getItem("token");
         const response = await spotyFansApi.get(`/playlist`, {
            headers: {
               "x-access-token": token,
            },
         });
         setPlaylists(response.data);
      } catch (error) {
         console.error("Error fetching playlists:", error);
      }
   };

   const deletePlaylist = async (playListId) => {
      try {
         const token = localStorage.getItem("token");
         await spotyFansApi.delete(`/playlist/${playListId}`, {
            headers: {
               "x-access-token": token,
            },
         });
         fetchPlaylists();
      } catch (error) {
         console.error("Error deleting playlist:", error);
      }
   };

   const getInfoUser = async () => {
      try {
         const token = localStorage.getItem("token");
         const { data } = await spotyFansApi.get("/user/info/this", {
            headers: {
               "x-access-token": token,
            },
         });

         setUserData(data);
      } catch (error) {
         console.log(`error al buscar el usuario!`, error);
      }
   };

   useEffect(() => {
      // Fetch all playlists on component mount
      getInfoUser();
      fetchPlaylists();
      dispatch(allSongs());
   }, []);

   // Resto del código...

   return (
      <div className="flex flex-col justify-center items-center mt-5 mb-10 text-white">
         {/* ... (otros elementos del componente) */}
         <h2 className="text-[2rem]">My playlists:</h2>

         <div className="grid grid-cols-3 gap-5 justify-center items-center mt-5">
            {playlists.map((playlist) => (
               <div
                  className="flex flex-row justify-between items-center w-[20rem]  pl-5 pr-5 z-50 bg-white rounded-[1rem] border shadow-2xl hover:text-white hover:bg-black duration-[.3s]"
                  key={playlist.id}>
                  <div className="text-[2rem] p-2 w-[10rem] overflow-hidden  whitespace-nowrap ">
                     <NavLink to={`/playlist/${playlist.id}`}>
                        <div >
                           <p className=" text-ellipsis">
									{playlist.name}
									</p>
                           <p className="text-[1rem] text-[#5f5f5f]">
                              by {userData.username}
                           </p>
                        </div>
                     </NavLink>
                  </div>

                  <button
                     className="hover:scale-[1.2] hover:rotate-[90deg] duration-[.3s]"
                     onClick={() => deletePlaylist(playlist.id)}>
                     <IconCircleXFilled size={30} />
                  </button>
               </div>
            ))}
         </div>
         {/* ... (otros elementos del componente) */}
      </div>
   );
};

export default Card_playlists;
