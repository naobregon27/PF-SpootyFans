import { NavLink } from "react-router-dom";

const Card = ({ id, name, genre, url, image }) => {
   return (
      <div>
         <NavLink to={`/detail/${id}`}>
            <h2>{name}</h2>
            <img src={image} alt={image} />
            <h3>{genre}</h3>
            <h3>{url}</h3>
         </NavLink>
      </div>
   );
};

export default Card;
