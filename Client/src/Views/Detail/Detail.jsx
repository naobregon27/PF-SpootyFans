import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {
  const { id } = useParams();
  const [songDetail, setSongDetail] = useState({});
  const getSongDetail = async (songId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3001/music/detail/${songId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        const { url, name, genre, imageUrl } = response.data;
        setSongDetail({ url, name, genre, imageUrl });
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
  }, [id]);

  if (!id) {
    return <h1>No hay ID</h1>;
  }
  return (
    <>
      <h2>{songDetail.name}</h2>
      <h3>Género: {songDetail.genre}</h3>
      <img
        src={songDetail.imageUrl}
        alt={`Imagen de la canción ${songDetail.name}`}
      />
      <ReactAudioPlayer src={songDetail.url} controls />
    </>
  );
};

export default Detail;
