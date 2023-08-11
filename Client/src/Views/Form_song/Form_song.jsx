import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Form_song.module.css";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";


const FormSong = () => {
  const token = localStorage.getItem("token");
  const {userId} = jwt_decode(token);
  const location = useLocation();
  const genres = useSelector((state) => state.categories)
  const newGenres = genres.filter((genre) => genre.name !== "All")
  const [userData, setUserData] = useState({isPremium: false });
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    const fetchUserData = async () => {
      const userResponse = await getUser();
      if (!userResponse.error) {
        setUserData({ isPremium: userResponse.data.isPremium });
      } else {
        console.log("Error al obtener la información del usuario:", userResponse.error);
      }
    };

    if (status === "approved") {
      fetchUserData();
      if (userId !== null) {
        alert("payment received, welcome to premium")
        changeStatusUser();
      }
    } else if (status === "null") {
      alert("failed payment");
    }
  }, [location.search, userId]);

  useEffect(() => {

    const fetchUserData = async () => {
      const userResponse = await getUser();
      if (!userResponse.error) {
        setUserData({ id: userResponse.data.id, isPremium: userResponse.data.isPremium });
      } else {
        console.log("Error al obtener la información del usuario:", userResponse.error);
      }
    };
    fetchUserData();
  }, [location.search]);

  const createPreference = async()=>{
    try{
      const response = await axios.post("http://localhost:3001/pago/create_preference", {
        description: "suscripcion",
        price: Number(1000),
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
  
  const changeStatusUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3001/user/setPremium",{},{
        headers: {
          "x-access-token": token,
        },
      });
      window.location.href = "http://localhost:5173/create";
    } catch (error) {
      console.error("Error changing user type", error);
    }
  }

  const getUser = async()=>{
    try{
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3001/user/info/${userId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response;
    }catch (error){
      console.log(error);
    }
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
          <select onChange={handleGenreChange}>
            <option value="">Select Genre</option>
            {newGenres.map((genre) => {
              return(
                <option key={genre.name} value={genre.name}>
                  {genre.name}
                </option>
              )
            })}
          </select>


          {/* <label htmlFor="genre">Genre:</label>
          <input
            className={style.datos}
            type="text"
            id="genre"
            value={data.genre}
            onChange={handleGenreChange}
          /> */}
        </div>
          <button
            className={style.boton}
            type="button"
            onClick={up}
            disabled={!userData.isPremium}>
            Upload your song!
          </button>
            {!userData.isPremium && (
            <h2>You must be Premium to upload songs.</h2>
            )}
        </div>
      </form>
        <div>
          {!userData.isPremium && (
          <button onClick={handleBuy}>Upgrade to Premium</button>
          )}
          {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
    </>
  );
};

export default FormSong;
