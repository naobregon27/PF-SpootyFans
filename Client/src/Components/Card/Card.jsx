import { NavLink } from "react-router-dom";
// import styles from "./Card.module.css";

const Card = ({ id, name, genre, url, image }) => {
   return (
      <div className="font-custom flex flex-col justify-center items-center bg-white w-[13rem] p-[1rem] shadow-2xl rounded-[1rem] hover:scale-[1.1] duration-[.3s]">
         <img className="w-[12rem] p-[.5rem] rounded-[1rem]" src={image} alt={image} />
         <div className="flex flex-col justify-center items-start  w-[10rem] overflow-hidden  whitespace-nowrap text-ellipsis mb-3">
            <h3 className=" text-[1.5rem] uppercase relative hover:animate-text_scrolling">
               {name}
            </h3>
            {/* <h3 className="w-full text-center p-1">{genre}</h3> */}
            <h3>{genre}</h3>
         </div>
         <span className=" whitespace-nowrap flex justify-center items-center m-2 h-0 w-[8rem] bg-black hover:h-[2rem] hover:rounded-[.5rem] delay-150 duration-[.3s]">
            <NavLink
               className="flex justify-center items-center p-1 rounded-[.5rem] hover:text-white hover:duration-[.3s] duration-[.3s] "
               to={`/detail/${id}`}>
               play song!
            </NavLink>
         </span>
      </div>
   );
};
export default Card;
