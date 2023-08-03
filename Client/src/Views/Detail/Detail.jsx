import React, {useState} from "react";

const Detail = () => {
 const [songsData] = useState(null);

 return(
  <div>
    <img src={songsData.imageUrl} alt={songsData.name} />
    <h2>Name: {songsData.name}</h2>
    <h2>Genres: {songsData.genre}</h2>

  </div>
 );
};

export default Detail;