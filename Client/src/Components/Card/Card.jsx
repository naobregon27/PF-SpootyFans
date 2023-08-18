import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";
import React from "react";

const Card = ({ id, name, artist, genre, url, image, averageRating }) => {
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
         <div className="flex flex-col justify-center items-start  w-[10rem] overflow-hidden  whitespace-nowrap text-ellipsis mb-3">
            <h3 className=" text-[1.5rem] uppercase relative hover:animate-text_scrolling">
               {name}
            </h3>
            {/* <h3 className="w-full text-center p-1">{genre}</h3> */}
            <h3 className="text-[1.2rem]">{artist}</h3>

            <div className="w-[90%] flex flex-row justify-evenly">
               <h3 className="text-[#ffffff95]">{genre}</h3>
               <form className={styles.clasificacion}>{renderStars()}</form>
            </div>
         </div>
         <NavLink to={`/detail/${id}`}>
            <span className=" whitespace-nowrap flex justify-center items-center m-2 h-[2rem] w-[8rem]  border-none bg-transparent rounded-[.5rem] hover:bg-white hover:border hover:text-black duration-[.3s]">
               play song!
            </span>
         </NavLink>
      </div>
   );
};
export default Card;
