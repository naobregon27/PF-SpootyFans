import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import SignUp from "./Views/Register/SignUp";
import FormSong from "./Views/Form_song/Form_song";
import Detail from "./Views/Detail/Detail";
import NavBar from "./Components/NavBar/NavBar";
import Playlist from "./Views/Playlists/Playlist";
import Detail_playlist from "./Views/Playlists/Detail_playlist"
import Profile from "./Views/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { pauseMusic } from "./Redux/actions";
import AudioPlayerGlobal from "./Components/AudioPlayerGlobal/AudioPlayerGlobal";
import "./global.css"

function App() {
  const isPlaying = useSelector(state => state.isPlaying);
  const currentSongUrls = useSelector(state => state.currentSongUrls);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isPlaying) {
      // Pausar la música cuando cambias de ruta
      dispatch(pauseMusic());
    }
  }, [location, isPlaying, dispatch]);

  useEffect(() => {
    if (
      !token &&
      location !== "/" &&
      location !== "/signup" &&
      location !== "/login"
    ) {
      navigate("/");
    }
  }, [token, location, navigate]);

  return (
    <>
      {location !== "/" && location !== "/signup" && location !== "/login" ? (
        <NavBar />
      ) : null}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/login" element={<Form />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<FormSong />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist/:id" element={<Detail_playlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {(location !== "/" && location !== "/signup" && location !== "/login" && currentSongUrls.length > 0) && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "20%",
            backgroundColor: "#f0f0f0",
            padding: "2px",
            boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
            marginTop: "10px", 
          }}
        >
          <AudioPlayerGlobal />
        </div>
      )}
    </>
  );
}

export default App;
