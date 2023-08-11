import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";
import { spotyFansApi } from "../../../services/apiConfig";

const Detail = () => {
  const { id } = useParams();
  const [songDetail, setSongDetail] = useState({});
  const getSongDetail = async (songId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await spotyFansApi.get(`/music/detail/${songId}`, {
        headers: {
          "x-access-token": token,
        },
      });

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
    <div className={style.detalles}>
      <>
        <h2 className={style.titulo}>{songDetail.name}</h2>
        <h3>
          <u>Género:</u> {songDetail.genre}
        </h3>
        <img
          className={style.album}
          src={songDetail.imageUrl}
          alt={`Imagen de la canción ${songDetail.name}`}
        />

        <div className="hr">
          <span></span>
        </div>

        <ReactAudioPlayer
          className={style.song}
          src={songDetail.url}
          controls
        />
      </>
    </div>
  );
};

export default Detail;
