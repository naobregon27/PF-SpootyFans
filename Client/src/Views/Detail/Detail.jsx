import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { spotyFansApi } from "../../../services/apiConfig";
import { setRating } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styles from "./Detail.module.css";
import Chat from "../Chat/Chat";

const Detail = ({ averageRating }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [songDetail, setSongDetail] = useState({});
  const currentSongUrls = useSelector((state) => state.currentSongUrls);

  const handleRating = (value) => {
    dispatch(setRating(value, id));
  };

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
          <label className={styles.label} htmlFor={`radio${i}`}>
            ★
          </label>
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

  return (
    <div className="flex flex-row gap-10 justify-center items-center font-custom w-screen h-screen text-white">
      <div className="flex flex-col w-fit h-fit justify-around items-center shadow-inner shadow-white p-2 rounded-[2rem] bg-[#ffffff10] backdrop-blur-[6px] font-custom overflow-x-hidden text-white">
        <img
          className="w-[30rem] m-10 rounded-[1.5rem]"
          src={songDetail.imageUrl}
          alt={`${songDetail.name}`}
        />

        <div className="flex flex-col justify-center items-center h-[14rem] ml-[1rem] max-md:ml-0">
          <div className="">
            <h className="text-[3.5rem] leading-7 overflow-hidden">
              {songDetail.name}
            </h>
            <h3 className="text-[#ffffff90] justify-center items-center mt-5 mb-5 ml-[.2rem] text-[2rem]">
              {songDetail.genre}
            </h3>

            <div className="">
              <form className="flex flex-row w-full justify-evenly text-[2rem]">
                Rate song <div>{renderStars()}</div>
              </form>
            </div>

            {/* <ReactAudioPlayer
              className="w-[25rem] max-md:max-w-[18rem]"
              src={songDetail.url}
              controls
              controlsList="nodownload"
            /> */}
          </div>
        </div>
      </div>
      <Chat className="chat" />
    </div>
  );
};

export default Detail;
