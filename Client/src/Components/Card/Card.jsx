import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, genre, url, image }) => {
   return (
     <div className={styles.container}>
       <div className={styles.carta}>
         <NavLink to={`/detail/${id}`}>
           <h3 className={styles.title}>{name}</h3>
           <img src={image} alt={image} />
           <h3>{genre}</h3>
         </NavLink>
       </div>
     </div>
   );
};

export default Card;
