import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { searchId } from '../../Redux/actions';

const Detail = () => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const [songsData, setSongsData] = useState(null);

 useEffect(()=>{
  dispatch(searchId(id))
  .then((data) => {
    setSongsData(data);
  })
  .catch((error)=>{
    console.error('Error fetching songs details:', error);
  });
 },[dispatch, id]);

 return(
  <div>
      {songsData ? (
        // Mostrar la información de la canción cuando songsData está disponible
        <>
          <h2>Name: {songsData.name}</h2>
          <h2>Genre: {songsData.genre}</h2>
          <img src={songsData.imageUrl} alt={songsData.name} />
          <audio controls autoPlay>
            <source src={songsData.url} type="audio/mp3" />
          </audio>
        </>
      ) : (
        // Mostrar mensaje de error cuando songsData no está disponible
        <div>No se encontro informacion para la cancion con ID:{id}</div>
      )}
      <Link to="/home">
        <button>Regresar</button>
      </Link>
    </div>
 );
};

export default Detail;