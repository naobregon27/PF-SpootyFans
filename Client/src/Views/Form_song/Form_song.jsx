import { useState } from "react";
import axios from "axios";
import style from "./Form_song.module.css";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

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
  const [preferenceId, setPreferenceId] = useState(null)
  initMercadoPago('TEST-49489d9a-43ea-4810-a664-1a848029c094');

  const createPreference = async()=>{
    try{
      const response = await axios.post("http://localhost:3001/pago/create_preference", {
        description: "suscripcion",
        price: Number(1),
        quantity: Number(1),
      });
      const {id} = response.data;
      return id;
    }catch (error){
      console.log(error);
    }
  };

  const handleBuy = async()=>{
    const id = await createPreference();
    if(id){
      setPreferenceId(id);
    }
  };

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
      const response = await axios.post(
        "http://localhost:3001/music/upload/url",
        postData
      );
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

      const responseSound = await axios.post(
        "http://localhost:4001/postmusic",
        formSound
      );
      console.log(
        "URL del archivo musical cargado:",
        responseSound.data.fileUrl
      );

      const responseImage = await axios.post(
        "https://postimagemicroservice-production.up.railway.app/cloudinary/upload",
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
            className={`${style.datos} ${style['datos-btn']}`}
            type="file" 
            id="file" 
            onChange={handleSoundChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Choose the album cover</label>
          <input
            className={`${style.datos} ${style['datos-btn']}`}
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
        <button className={style.boton}
        type="button" onClick={up}>
          Upload your song!
        </button>
        </div>
      </form>
        <div >
        <button onClick={handleBuy}>Upgrade to Premium</button>
        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
    </>
  );
};

export default FormSong;
