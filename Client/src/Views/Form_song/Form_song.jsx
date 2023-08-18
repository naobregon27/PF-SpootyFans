import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useSelector } from "react-redux";
import {
  spotyFansApi,
  postMusicApi,
  postImageApi,
} from "../../../services/apiConfig";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {IconFileMusic, IconPhotoPlus} from "@tabler/icons-react";

const FormSong = () => {
  const token = localStorage.getItem("token");
  const {userId, email} = jwt_decode(token);
  const location = useLocation();
  const genres = useSelector((state) => state.categories);
  const newGenres = genres.filter((genre) => genre.name !== "All");
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
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-49489d9a-43ea-4810-a664-1a848029c094");
  
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

  const createPreference = async () => {
    try {
      const response = await spotyFansApi.post("/pago/create_preference", {
        description: "suscripcion",
        price: Number(1000),
        quantity: Number(1),
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
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

  const handleArtistChange = (e) => {
    setData({
      ...data,
      artist: e.target.value,
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
      await spotyFansApi.put("/user/setPremium",{},{
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
      const response = await spotyFansApi.get(`/user/info/${userId}`, {
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
      formImage.append("image", imagedFile);

      const responseSound = await postMusicApi.post("/postmusic", formSound);
      console.log(
        "URL del archivo musical cargado:",
        responseSound.data.fileUrl
      );

      const responseImage = await postImageApi.post(
        "/upload",
        formImage
      );
      console.log(
        "URL del archivo jpg cargado:",
        responseImage.data.imageUrl
      );

      const postDataObject = {
        ...data,
        imageUrl: responseImage.data.imageUrl,
        url: responseSound.data.fileUrl,
        email: email,
      };

      await setData(postDataObject);
      await postData(postDataObject);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className=" flex flex-col justify-center items-center w-screen max-w-full h-screen bg-transparent font-custom overflow-x-hidden absolute text-white">
        
        <div className="z-10 w-[25rem] h-fit min-h-[50%] flex flex-col justify-evenly items-center rounded-[2rem] p-5 bg-[#ffffff10] shadow-inner shadow-white backdrop-blur-[6px] hover:scale-[1.05] duration-[.3s]">

          <h2 className="text-[2rem]">Good luck...</h2>

          <div className="flex flex-row justify-center items-center gap-10">

            <label className="text-white flex flex-col justify-center items-center" htmlFor="file"><IconFileMusic size={80} stroke={1}/>
            <p className="text-[.9rem] text-[#ffffff80]">audio file</p>
            </label>
            <input
              className="hidden"
              type="file"
              id="file"
              onChange={handleSoundChange}
            />
          
            <label className="text-white flex flex-col justify-center items-center" htmlFor="exampleFormControlFile1">
            <IconPhotoPlus size={80} stroke={1}/>
            <p className="text-[.9rem] text-[#ffffff80]">album cover</p>
            </label>
            <input
              className="hidden"
              type="file"
              id="exampleFormControlFile1"
              onChange={handleImageChange}
            />
          </div>

          <div >
            <input
              className="text-white outline-none p-2 w-[15rem] border border-[#ffffff20] bg-transparent rounded-[5rem] focus:scale-[1.1] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] duration-[.3s]"
              type="text"
              id="name"
              placeholder="Name of the song"
              value={data.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            
            <input
              className="text-white outline-none p-2 w-[15rem] border border-[#ffffff20] bg-transparent rounded-[5rem] focus:scale-[1.1] focus:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] duration-[.3s]"
              type="text"
              id="artist"
              placeholder="Artist"
              value={data.artist}
              onChange={handleArtistChange}
            />
          </div>
          <div className="form-group">
            <label className=" flex justify-center items-center text-white"htmlFor="genre"></label>
            <select 
            className="text-white outline-none p-2 border border-[#ffffff70] bg-transparent rounded-[5rem] focus:scale-[1.1] focus:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]" onChange={handleGenreChange}>
              <option value="">Select Genre</option>
              {newGenres.map((genre) => {
                return (
                  <option key={genre.name} value={genre.name}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="flex text-[1.5rem] flex-row justify-center items-center p-[.4rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white text-black w-[7rem] rounded-[5rem] border border-[#ffffff20] hover:bg-transparent hover:scale-[1.2] hover:text-white duration-[.3s]"
            type="button"
            onClick={up}
            disabled={!userData.isPremium}>
            Upload
          </button>
            {!userData.isPremium && (
            <h2>You must be Premium to upload songs.</h2>
            )}
        </div>
      </form>

      {!userData.isPremium && 
      <div className="flex flex-col justify-center items-center h-screen w-screen z-[990] absolute bg-[#ffffff10] backdrop-blur-[7px]">
      {!userData.isPremium && (
        <button className="text-white text-[5rem] font-custom border p-5 rounded-[5rem] bg-[#ffffff20] hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] mt-01" onClick={handleBuy}>Upgrade to <span className="animate-multicolor_text">Premium</span></button>
        )}
          {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
      </div>
      }
    </div>
  );
};

export default FormSong;
