import { useDispatch } from "react-redux";
import { useState, useEffect} from "react";
import axios from "axios";

const FormSong = () => {
  const [soundFile, setSoundFile] = useState(null);
  const [imagedFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    url:'',
    name: 'name',
    genre: 'Genero',
    imageUrl: '',
    isActive: true
  })

  const handleSoundChange = (e) => {
    setSoundFile(e.target.files[0]);
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
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
        console.log(data);
       await setData(
          {...data,
              imageUrl:responseImage.data.secure_url,
              url:responseSound.data.fileUrl
          })
          const postData = async () => {
            try {
              const response = await axios.post(
                "http://localhost:3001/music/upload/url",
                data
              );
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          };
        
          postData();
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
        <button type="button" onClick={(e) => up(e)}>
          Subir
        </button>
      </form>
    </>
  );
};

export default FormSong;
