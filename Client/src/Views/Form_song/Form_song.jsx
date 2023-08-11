import { useState } from "react";
import {
  spotyFansApi,
  postMusicApi,
  postImageApi,
} from "../../../services/apiConfig";
import style from "./Form_song.module.css";

const FormSong = () => {
  const [soundFile, setSoundFile] = useState(null);
  const [imagedFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    url: "",
    name: "",
    genre: "",
    imageUrl: "",
    isActive: true,
  });

  const handleSoundChange = (e) => {
    setSoundFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };

  const handleGenreChange = (e) => {
    setData({
      ...data,
      genre: e.target.value,
    });
  };

  const postData = async (postData) => {
    try {
      const response = await spotyFansApi.post("/music/upload/url", postData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const up = async (e) => {
    e.preventDefault();
    try {
      const formSound = new FormData();
      const formImage = new FormData();

      formSound.append("file", soundFile);
      formImage.append("multipartFile", imagedFile);

      const responseSound = await postMusicApi.post("/postmusic", formSound);
      console.log(
        "URL del archivo musical cargado:",
        responseSound.data.fileUrl
      );

      const responseImage = await postImageApi.post(
        "/cloudinary/upload",
        formImage
      );
      console.log(
        "URL del archivo jpg cargado:",
        responseImage.data.secure_url
      );

      const postDataObject = {
        ...data,
        imageUrl: responseImage.data.secure_url,
        url: responseSound.data.fileUrl,
      };

      await setData(postDataObject);
      await postData(postDataObject);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={style.mainContainer}>
        <div className={style.form}>
          <h2>good luck...</h2>
          <div className="form-group">
            <label htmlFor="file">Choose the audio file</label>
            <input
              className={`${style.datos} ${style["datos-btn"]}`}
              type="file"
              id="file"
              onChange={handleSoundChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">
              Choose the album cover
            </label>
            <input
              className={`${style.datos} ${style["datos-btn"]}`}
              type="file"
              id="exampleFormControlFile1"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name of the song:</label>
            <input
              className={style.datos}
              type="text"
              id="name"
              value={data.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <input
              className={style.datos}
              type="text"
              id="genre"
              value={data.genre}
              onChange={handleGenreChange}
            />
          </div>
          <button className={style.boton} type="button" onClick={up}>
            Upload your song!
          </button>
        </div>
      </form>
    </>
  );
};

export default FormSong;
