import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allSongs } from "../../Redux/actions";
import style from "./Card_playlists.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { spotyFansApi } from "../../../services/apiConfig";

const Card_playlists = () => {
  const navigate = useNavigate();
  const songs = useSelector((state) => state.songsCopy);
  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await spotyFansApi.get(`/playlist`, {
        headers: {
          "x-access-token": token,
        },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const deletePlaylist = async (playListId) => {
    try {
      const token = localStorage.getItem("token");
      await spotyFansApi.delete(`/playlist/${playListId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      fetchPlaylists();
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  useEffect(() => {
    // Fetch all playlists on component mount
    fetchPlaylists();
    dispatch(allSongs());
  }, []);

  // Resto del código...

  return (
    <div className={style.mainContainer}>
      {/* ... (otros elementos del componente) */}

      <ul className="flex flex-col justify-center items-center">
        <h2>My playlists:</h2>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <NavLink
              className={style.playlists}
              to={`/playlist/${playlist.id}`}
            >
              {playlist.name}
            </NavLink>

            <button
              className={style.botonx}
              onClick={() => deletePlaylist(playlist.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>

      {/* ... (otros elementos del componente) */}
    </div>
  );
};

export default Card_playlists;