import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSongs } from "../../Redux/actions";
import { useNavigate, NavLink } from "react-router-dom";
import { spotyFansApi } from "../../../services/apiConfig";
import { IconPlus, IconEraser } from "@tabler/icons-react";

const Playlist = () => {
   const navigate = useNavigate();

   const songs = useSelector((state) => state.songsCopy);

   const dispatch = useDispatch();

   const [playlists, setPlaylists] = useState([]);
   const [newPlaylist, setNewPlaylist] = useState("");
   const [selectedPlaylist, setSelectedPlaylist] = useState("");
   const [songToAdd, setSongToAdd] = useState("");
   // const [songToRemove, setSongToRemove] = useState('');

   useEffect(() => {
      // Fetch all playlists on component mount
      fetchPlaylists();
      dispatch(allSongs());
   }, []);

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

   const createPlaylist = async () => {
      try {
         const token = localStorage.getItem("token");
         const { data } = await spotyFansApi.post(
            `/playlist`,
            { name: newPlaylist },
            {
               headers: {
                  "x-access-token": token,
               },
            }
         );
         setPlaylists([...playlists, data]);
         setNewPlaylist("");
         navigate(`/playlist/${data.id}`);
      } catch (error) {
         console.error("Error creating playlist:", error);
      }
   };

   const addSongToPlaylist = async () => {
      try {
         const token = localStorage.getItem("token");
         await spotyFansApi.post(
            `/playlist/addSong`,
            { playListId: Number(selectedPlaylist), songId: Number(songToAdd) },
            {
               headers: {
                  "x-access-token": token,
               },
            }
         );
         setSongToAdd("");
         setSelectedPlaylist("");
      } catch (error) {
         console.error("Error adding song to playlist:", error);
      }
      console.log(selectedPlaylist, songToAdd);
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

   const findSong = (name) => {
      if (name) {
         const songFilter = songs.find((song) => song.name === name);
         setSongToAdd(songFilter.id);
      } else return;
   };

   return (
      <div className=" flex flex-col justify-center items-center w-screen max-w-full h-screen bg-transparent font-custom overflow-x-hidden absolute text-white">

         <div className="z-10 w-fit h-fit min-h-[50%] flex flex-col justify-evenly items-center rounded-[2rem] p-5 bg-[#ffffff10] shadow-inner shadow-white backdrop-blur-[6px]">
            <div>
               <h2 className="flex flex-col justify-center items-center text-[2rem] mb-[1rem]">
                  Create a new Playlist
               </h2>

               <div className="flex justify-center items-center">
                  <div className="flex flex-row justify-center w-fit gap-2">
                     <input
                        className="text-[1rem] bg-transparent outline-none p-1 w-[15rem] border-b-2 border-[#ffffff30] focus:border-white duration-[.3s]"
                        type="text"
                        value={newPlaylist}
                        onChange={(e) => setNewPlaylist(e.target.value)}
                     />

                     <button
                        className="w-[2rem] h-[2rem] flex justify-center items-center"
                        onClick={createPlaylist}>
                        <IconPlus />
                     </button>
                  </div>
               </div>
            </div>

            <div className="flex flex-col justify-center items-center">
               <h2 className="text-[1.3rem] mb-5 mt-5">My playlists:</h2>

               <div className=" grid grid-cols-2 gap-4">
                  {playlists.map((playlist) => (
                     <div
                        className="flex flex-row justify-between items-center p-[.7rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-[5rem] w-[10rem] border border-[#ffffff20] bg-[#00000020] hover:bg-white hover:text-black hover:translate-y-[-.5rem] duration-[.3s]"
                        key={playlist.id}>
                        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                           <NavLink to={`/playlist/${playlist.id}`}>
                              {playlist.name}
                           </NavLink>
                        </div>

                        <button
                           className="m-1 rounded-[5px] hover:scale-[1.1] duration-[.3s]"
                           onClick={() => deletePlaylist(playlist.id)}>
                           <IconEraser />
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Playlist;
