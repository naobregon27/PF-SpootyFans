import { NavLink } from "react-router-dom";

const Card = ({ id, name, genre, url, imageUrl }) => {
   return (
      <div>
         <NavLink to={`/detail/${id}`}>
            <h2>{name}</h2>
            <img src={imageUrl} alt={imageUrl} />
            <h3>{genre}</h3>
            <h3>{url}</h3>
         </NavLink>
      </div>
   );
};

export default Card;
