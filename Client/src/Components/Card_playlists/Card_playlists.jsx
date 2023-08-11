import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allSongs } from '../../Redux/actions';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const Card_playlists = () => {
  const navigate = useNavigate();
  const songs = useSelector((state) => state.songsCopy);
  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3001/playlist`, {
        headers: {
          "x-access-token": token,
        },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const deletePlaylist = async (playListId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/playlist/${playListId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };


  useEffect(() => {
    // Fetch all playlists on component mount
    fetchPlaylists();
    dispatch(allSongs());
  }, []);

  // Resto del código...

  return (
    <div >
      {/* ... (otros elementos del componente) */}
      
      <ul className="flex flex-col justify-center items-center z-50">
        <h2 className="text-[2rem] p-5">My playlists:</h2>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <NavLink to={`/playlist/${playlist.id}`}>
              {playlist.name}
            </NavLink>
            
            <button onClick={() => deletePlaylist(playlist.id)}>x</button>
          </li>
        ))}
      </ul>

      {/* ... (otros elementos del componente) */}
    </div>
  );
};

export default Card_playlists;