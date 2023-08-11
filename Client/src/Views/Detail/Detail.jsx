import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

            <ReactAudioPlayer
              className="w-[25rem] max-md:max-w-[18rem]"
              src={songDetail.url}
              controls
              controlsList="nodownload"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
