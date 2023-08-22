import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { spotyFansApi } from "../../../services/apiConfig";
import { setRating } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styles from "./Detail.module.css";
import Chat from "../Chat/Chat";

const Detail = ({ averageRating }) => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const [songDetail, setSongDetail] = useState({});
   const currentSongUrls = useSelector((state) => state.currentSongUrls);

   const handleRating = (value) => {
      dispatch(setRating(value, id));
   };

   const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(
            <React.Fragment key={i}>
               <input
                  className="hidden"
                  type="radio"
                  id={`radio${i}`}
                  name={`estrellas${id}`}
                  value={i}
                  checked={averageRating === i}
                  onClick={() => handleRating(event.target.value)}
               />
               <label
                  className="hover:text-orange-500 duration-[.3s]"
                  htmlFor={`radio${i}`}>
                  ★
               </label>
            </React.Fragment>
         );
      }
      return stars;
   };

   const getSongDetail = async (songId) => {
      try {
         const token = localStorage.getItem("token");
         const response = await spotyFansApi.get(`/music/detail/${songId}`, {
            headers: {
               "x-access-token": token,
            },
         });

         if (response.status === 200) {
            const { url, name, genre, imageUrl, averageRating } = response.data;
            setSongDetail({ url, name, genre, imageUrl, averageRating });
         } else {
            throw new Error(
               "No se ha podido realizar la petición exitosamente."
            );
         }
      } catch (error) {
         console.error(error.message);
      }
   };

   useEffect(() => {
      if (id) {
         getSongDetail(id);
      }
   }, [id, songDetail.averageRating]);

   if (!id) {
      return <h1>No hay ID</h1>;
   }

   return (
      <div className="grid grid-cols-2 max-md:grid-cols-1 justify-items-center place-items-center font-custom w-screen h-screen text-white">
         <div className="rounded-[2rem] shadow-2xl shadow-black  hover:scale-[1.05] duration-[.3s]">
            <div className="flex flex-col w-fit h-fit max-md:mt-10 justify-around items-center shadow-inner shadow-white  rounded-[2rem] bg-[#ffffff07] backdrop-blur-[6px] font-custom overflow-x-hidden text-white">
               <img
                  className="w-[15rem] m-5 rounded-[1.5rem]"
                  src={songDetail.imageUrl}
                  alt={`${songDetail.name}`}
               />
               <div className="flex flex-col justify-center items-center h-fit m-5">
                  <h2 className="flex justify-center items-center w-[15rem] text-[2.5rem] overflow-hidden whitespace-nowrap text-ellipsis pt-0 mt-0">
                     {songDetail.name}
                  </h2>

                  <h2 className="text-[#ffffff90] justify-center items-center text-[1.4rem]">
                     {songDetail.genre}
                  </h2>

                  <div className="">
                     <form className="flex flex-row w-full gap-5 justify-evenly text-[1.3rem]">
                        Rate song <div>{renderStars()}</div>
                     </form>
                  </div>
               </div>
            </div>
         </div>

         {/* <ReactAudioPlayer
              className="w-[25rem] max-md:max-w-[18rem]"
              src={songDetail.url}
              controls
              controlsList="nodownload"
            /> */}

         <div className="w-[50%]">
            <Chat className="chat" />
         </div>
      </div>
   );
};

export default Detail;
