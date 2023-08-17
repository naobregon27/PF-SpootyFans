import ReactAudioPlayer from "react-audio-player";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { spotyFansApi } from "../../../services/apiConfig";
import { setCurrentSongUrls, setRating } from "../../Redux/actions";
import { useDispatch, useSelector} from "react-redux";
import React from "react";
import styles from "./Detail.module.css";

const Detail = ({averageRating}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [songDetail, setSongDetail] = useState({});
  const currentSongUrls = useSelector((state) => state.currentSongUrls);


  const handleRating = (value) => {
    dispatch(setRating(value, id))
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <React.Fragment key={i}>
          <input
            type="radio"
            id={`radio${i}`}
            name={`estrellas${id}`}
            value={i}
            checked={averageRating === i}
            onClick={() => handleRating(event.target.value)}
          />
          <label htmlFor={`radio${i}`}>★</label>
        </React.Fragment>
      );
    }
    return stars;
  };

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
  }

  const playSong = () => {
    const updatedUrls = [songDetail.url]; 
    dispatch(setCurrentSongUrls(updatedUrls)); 
    navigate(`/detail/${id}`);
  }

  return (
    <div className="flex flex-col justify-center items-center font-custom relative w-screen top-[8rem]  ">
      <div className="flex flex-row items-center w-[50rem] max-md:w-fit max-md:h-fit shadow-2xl rounded-[1.5rem] max-md:flex-col max-md:max-w-xs">
        <div className="p-7 bg-slate-100 rounded-l-[1.5rem] max-md:bg-transparent">
          <img
            className="max-w-[15rem] max-md:w-fit max-md:shadow-2xl"
            src={songDetail.imageUrl}
            alt={`Imagen de la canción ${songDetail.name}`}
          />
        </div>

        <div className="flex flex-col justify-center items-center w-[30rem] h-[14rem] ml-[1rem] max-md:ml-0">
          <div className="">
            <h className="text-[2rem] leading-7 overflow-hidden">
              {songDetail.name}
            </h>
            <h3 className="ml-[.2rem]">{songDetail.genre}</h3>

            <form className={styles.clasificacion}>!ereh gnos siht etaR {renderStars()}</form>

            <ReactAudioPlayer
              className="w-[25rem] max-md:max-w-[18rem]"
              src={songDetail.url}
              controls
              controlsList="nodownload"
            />
            <button onClick={playSong}>Play Song</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
