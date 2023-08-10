import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allSongs } from '../../Redux/actions';
import axios from 'axios';
import style from "./Playlist.module.css";
import { useNavigate , NavLink } from 'react-router-dom';

const Playlist = () => {

  const navigate = useNavigate();

  const songs = useSelector((state) => state.songsCopy)

  const dispatch = useDispatch()

  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [songToAdd, setSongToAdd] = useState("");
  // const [songToRemove, setSongToRemove] = useState('');

  useEffect(() => {
    // Fetch all playlists on component mount
    fetchPlaylists();
    dispatch(allSongs())
  }, []);

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

  const createPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.post(`http://localhost:3001/playlist`, { name: newPlaylist }, {
        headers: {
          "x-access-token": token,
        },
      });
      setPlaylists([...playlists, data]);
      setNewPlaylist('');
      navigate(`/playlist/${data.id}`)
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const addSongToPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:3001/playlist/addSong`, { playListId:  Number(selectedPlaylist), songId: Number(songToAdd) }, {
        headers: {
          "x-access-token": token,
        },
      });
      setSongToAdd('');
      setSelectedPlaylist('');
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
    console.log(selectedPlaylist, songToAdd);
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

  const findSong = (name) => {
    if(name){
      const songFilter = songs.find((song) => song.name === name)
      setSongToAdd(songFilter.id)
    }
    else return
  }

  return (
    <div className={style.mainContainer}>
      
      <div>
        <h2 className="flex flex-col justify-center items-center text-black font-bold">Create a new Playlist...</h2>
        <input
          type="text"
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
        />
        <button className={style.boton} onClick={createPlaylist}>Create</button>
      </div>

      <ul className="flex flex-col justify-center items-center">
        <h2>My playlists:</h2>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <NavLink className={style.playlists} to={`/playlist/${playlist.id}`}>
            {playlist.name}
            </NavLink>
            
            <button className={style.botonx} onClick={() => deletePlaylist(playlist.id)}>x</button>
          </li>
        ))}
      </ul>


      <div>
        <h1 className="flex flex-col justify-center items-center text-black font-bold"> Let´s add some songs!</h1>
        <h2 className="flex flex-col justify-center items-center">You wanna add a song?</h2>

        <input list="brow" onChange={(e) => findSong(e.target.value)}/>
          <datalist id="brow">
          {songs.map((song) => (
            <option key={song.id} value={song.name}>
              {song.name}
            </option>
          ))}
          </datalist>  

        
      </div>

      <div>
        <h2 className="flex flex-col justify-center items-center">To what playlist?</h2>
        <select
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
        >
          <option value="">Select Playlist</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
        <hr/>
      
      </div>
      <button className={style.boton} onClick={addSongToPlaylist}>Add Song</button>
    </div>
  );
};

export default Playlist;
