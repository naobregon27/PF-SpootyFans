import style from "./Detail_playlist.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Detail_playlist = () => {
  const { id } = useParams();

  const songs = useSelector((state) => state.songsCopy);

  const [playlist, setPlaylist] = useState({});
  const [songToAdd, setSongToAdd] = useState("");
  const [rerender, setRerender] = useState(false);
  const [changeName, setChangeName] = useState("");

  const getPlaylistDetail = async (playListId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:3001/playlist/${playListId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setPlaylist(data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPlaylistDetail(id);
    }
  }, [id, rerender, playlist.name, playlist.Songs]);

  const addSongToPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3001/playlist/addSong`,
        { playListId: Number(id), songId: Number(songToAdd) },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      setSongToAdd("");
      setRerender(!rerender);
      //* cambia el estado y lo renderiza arriba en el array de dependencias (2do parametro)
      console.log(
        "info de la playlist ",
        playlist.Songs.map((song) => song.name)
      );
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  const deleteSong = async (songId) =>{

    try {
      
      const token = localStorage.getItem("token")
      await axios.put(`http://localhost:3001/playlist/removeSong/`, { playListId: Number(id), songId: Number(songId) }, {
      headers: {
      "x-access-token": token,
        }
      })

    } catch (error) {
      onsole.error("Error deleting song!", error);
    }

    
  }

  const changeNamePlaylist = async () => {

    try {
      const playListId = Number(id);
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3001/playlist/${playListId}`, {newName: changeName}, {
      headers:{
        "x-access-token": token,
      }
    })
    setPlaylist({name: changeName})
    alert("Name changed!")
  } catch (error) {
      console.error("Error changing playlist name", error);
    }

    
  }

  const findSong = (name) => {
    if (name) {
      const songFilter = songs.find((song) => song.name === name);
      setSongToAdd(songFilter.id);
    } else return;
  };

  return (
    <div className={style.mainContainer}>
      <div className="flex flex-col justify-center items-center">
      <NavLink to="/playlist">
        <button className="flex flex-col justify-center items-center text-black font-bold" style={{ border: '2px solid black' }}>Back</button>
      </NavLink>
      </div>
      <h1>{playlist.name && playlist.name}</h1>

      <h3 className="flex flex-col justify-center items-center text-black font-bold">Want to change the name? Write it down!</h3>
      <input onChange={(e) => setChangeName(e.target.value)} />
      <button className={style.boton} onClick={changeNamePlaylist}>Change Name</button>

      <div className="flex flex-col justify-center items-center text-black font-bold">
        <h2>What song do you want to add?</h2>

        <input list="brow" onChange={(e) => findSong(e.target.value)} />
        <datalist id="brow">
          {songs.map((song) => (
            <option key={song.id} value={song.name}>
              {song.name}
            </option>
          ))}
        </datalist>

        <div>
          <button className={style.boton} onClick={addSongToPlaylist}>
            Add Song
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="flex flex-col justify-center items-center text-black font-bold">songs:</h2>

        <ul>
          {playlist.Songs && playlist.Songs.length > 0 ? (
            playlist.Songs.map((song) => (
              <li key={song.id}>
                <NavLink to={`/detail/${song.id}`}>{song.name}</NavLink>

                <button className={style.botonx} onClick={() => deleteSong(song.id)}>x</button>
              </li>
            ))
          ) : (
            <li>This playlist is empty</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Detail_playlist;
