import { useState } from "react";
import axios from "axios";

const FormSong = () => {
  const [soundFile, setSoundFile] = useState(null);
  const [imagedFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    url: "",
    name: "name",
    genre: "Genero",
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
      <form>
        <div className="form-group">
          <label htmlFor="file">Seleccione un archivo</label>
          <input type="file" id="file" onChange={handleSoundChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Seleccione una imagen</label>
          <input
            type="file"
            id="exampleFormControlFile1"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre de la canción</label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Género</label>
          <input
            type="text"
            id="genre"
            value={data.genre}
            onChange={handleGenreChange}
          />
        </div>
        <button type="button" onClick={up}>
          Subir
        </button>
      </form>
    </>
  );
};

export default FormSong;
