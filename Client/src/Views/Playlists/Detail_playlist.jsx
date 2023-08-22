import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { spotyFansApi } from "../../../services/apiConfig";
import { useDispatch } from "react-redux";
import { setCurrentSongUrls } from "../../Redux/actions";
import { IconPencil, IconMusicPlus,IconPlayerPlayFilled, IconX, IconPlayerPauseFilled } from "@tabler/icons-react";

const Detail_playlist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSongs, setSelectedSongs] = useState([]);
  const songs = useSelector((state) => state.songsCopy);

  const [playlist, setPlaylist] = useState({});
  const [songToAdd, setSongToAdd] = useState("");
  const [rerender, setRerender] = useState(false);
  const [changeName, setChangeName] = useState("");

  const getPlaylistDetail = async (playListId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await spotyFansApi.get(`/playlist/${playListId}`, {
        headers: {
          "x-access-token": token,
        },
      });
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
      await spotyFansApi.post(
        `/playlist/addSong`,
        { playListId: Number(id), songId: Number(songToAdd) },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      setSongToAdd("");
      document.getElementById("songInput").value = "";
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

  const deleteSong = async (songId) => {
    try {
      const token = localStorage.getItem("token");
      await spotyFansApi.put(
        `/playlist/removeSong/`,
        { playListId: Number(id), songId: Number(songId) },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
    } catch (error) {
      onsole.error("Error deleting song!", error);
    }
  };

  const changeNamePlaylist = async () => {
    try {
      const playListId = Number(id);
      const token = localStorage.getItem("token");
      await spotyFansApi.put(
        `/playlist/${playListId}`,
        { newName: changeName },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setPlaylist({ name: changeName });
      alert("Name changed!");
    } catch (error) {
      console.error("Error changing playlist name", error);
    }
  };

  const findSong = (name) => {
    if (name) {
      const songFilter = songs.find((song) => song.name === name);
      setSongToAdd(songFilter.id);
    } else {
      setSongToAdd(""); // Si no hay nombre, resetea songToAdd a un valor vacío
    }
  };

  const playSelectedSongs = () => {
    const songUrls = playlist.Songs
      ? playlist.Songs.map((song) => song.url)
      : [];

    const updatedSelectedSongs = [...selectedSongs, ...songUrls];
    setSelectedSongs(updatedSelectedSongs);
    dispatch(setCurrentSongUrls(updatedSelectedSongs));
  };

  return (
    <div className=" flex flex-col justify-center items-center w-screen max-w-full h-screen bg-transparent font-custom overflow-x-hidden absolute text-white">
      <div className="z-10 w-fit h-fit min-h-[50%] flex flex-col justify-evenly items-center rounded-[2rem] p-5 bg-[#ffffff10] shadow-inner shadow-white backdrop-blur-[6px]">
        <div className="flex flex-col justify-center items-center">
          <NavLink to="/playlist">
            <button className="flex text-[1.5rem] flex-row justify-center items-center p-[.7rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-[5rem] w-[10rem] border border-[#ffffff20] bg-[#00000020] hover:bg-white hover:text-black hover:translate-y-[-.5rem] duration-[.3s]">
              Back
            </button>
          </NavLink>
        </div>

        <h1 className="text-[1.5rem] text-[#ffffff70] hover:animate-spin duration-[.3]">
          "{playlist.name && playlist.name}"
        </h1>

        <div className="flex flex-col justify-center items-center text-white text-[1.7rem]">
          <p>
            Want to <span className="animate-multicolor_text">change</span> the
            name?
          </p>
          <p>Write it down!</p>
        </div>

        <div className="flex flew-row justify-center border rounded-[5rem] focus:scale-[1.1]">
          <input
            className="bg-transparent outline-none border-none w-[14rem] pl-5"
            onChange={(e) => setChangeName(e.target.value)}
          />
          <button
            className="w-[2rem] h-[2rem] flex justify-center items-center"
            onClick={changeNamePlaylist}
          >
            <IconPencil />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center text-white font-bold text-[1.7rem]">
          <h2>What song do you want to add?</h2>
          
          <div className="flex flew-row justify-center border rounded-[5rem] focus:scale-[1.1]">
            <input
              className="bg-transparent outline-none border-none w-[14rem]"
              id="songInput"
              list="brow"
              onChange={(e) => findSong(e.target.value)}
            />
            <datalist id="brow">
              {songs.map((song) => (
                <option key={song.id} value={song.name}>
                  {song.name}
                </option>
              ))}
            </datalist>

            <div>
              <button
                className="w-[2rem] h-[2rem] flex justify-center items-center gap-5"
                onClick={addSongToPlaylist}
              >
                <IconMusicPlus />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="flex flex-col justify-center items-center text-white font-bold text-[1.7rem]">
            Songs:
          </h2>

          <div className="grid">
            {playlist.Songs && playlist.Songs.length > 0 ? (
              playlist.Songs.map((song) => (
                <div className="flex flex-row justify-between items-center gap-5 border border-[#ffffff50] mt-2 mb-2 text-[rem] rounded-[0.5rem] p-3" key={song.id}>
                  <NavLink to={`/detail/${song.id}`}>{song.name}</NavLink>

                  <button className="text-[red] hover:scale-[1.5]" 
                  onClick={() => deleteSong(song.id)}>
                    <IconX/>
                  </button>
                </div>
              ))
            ) : (
              <h1>This playlist is empty</h1>
            )}
          </div>
          {/* {playlist.Songs && playlist.Songs.length > 0 && (
            <button className="" onClick={() => playSelectedSongs()}>
              <IconPlayerPlayFilled/>
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Detail_playlist;
