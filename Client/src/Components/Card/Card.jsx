import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { setCurrentSongUrls} from "../../Redux/actions";
import { spotyFansApi } from "../../../services/apiConfig";

const Card = ({ id, name, artist, genre, url, image, averageRating }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [songDetail, setSongDetail] = useState({});
  const currentSongUrls = useSelector((state) => state.currentSongUrls);
  
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
       throw new Error("No se ha podido realizar la petición exitosamente.");
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
 }const playSong = () => {

   const updatedUrls = [songDetail.url]; 
   dispatch(setCurrentSongUrls(updatedUrls)); 
   navigate(`/detail/${id}`);
 }

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const estrellas = i <= averageRating ? styles.amarilla : "";
      stars.push(
        <React.Fragment key={i}>
          <label className={estrellas} htmlFor={`radio${i}`}>
            ★
          </label>
        </React.Fragment>
      );
    }
    return stars;
  };
  //* las clases se aplican en función del valor de averageRating
  //* si averageRating es 3, las primeras 3★ tendrán la clase styles.amarilla

  return (
    <div className="font-custom flex flex-col justify-center items-center bg-[#ffffff10] border border-[#ffffff10] backdrop-blur-[8px] w-[13rem] p-[.8rem] hover:shadow-inner hover:shadow-white rounded-[1rem] text-white hover:scale-[1.05] duration-[.3s]">
      <NavLink to={`/detail/${id}`}>
        <img
          className="w-[12rem] p-[.5rem] rounded-[1rem]"
          src={image}
          alt={image}
        />
      </NavLink>
      <div className="flex W-screen flex-col justify-center items-start  w-[10rem] overflow-hidden  whitespace-nowrap text-ellipsis mb-3">
        <h3 className=" text-[1.5rem] uppercase relative hover:animate-text_scrolling">
          {name}
        </h3>
        <div className="w-[90%] flex flex-row justify-evenly">
          <h3 className="text-[1.2rem]">{artist}</h3>
        </div>
        <div className="w-[90%] flex flex-row justify-evenly">
          <h3 className="text-[#ffffff95]">{genre}</h3>
        </div>
        <div className="w-[90%] flex flex-row justify-evenly">
          <form className={styles.clasificacion}>{renderStars()}</form>
        </div>
      </div>

      <button
        className=" whitespace-nowrap flex justify-center items-center m-2 h-[2rem] w-[8rem]  border-none bg-transparent rounded-[.5rem] hover:bg-white hover:border hover:text-black duration-[.3s]"
        onClick={playSong}
      >
        play song!
      </button>
    </div>
  );
};
export default Card;
