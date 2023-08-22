import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { playMusic, pauseMusic, setCurrentSongUrls } from "../../Redux/actions";

const AudioPlayerGlobal = ({ isPlaying, currentSongUrls, playMusic, pauseMusic }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audioRef, setAudioRef] = useState(null);

  useEffect(() => {
    if (audioRef) {
      isPlaying ? audioRef.play() : audioRef.pause();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (currentSongUrls.length > 0) {
      setCurrentSongIndex(0);
    }
  }, [currentSongUrls]);

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const playNextSong = () => {
    if (currentSongIndex < currentSongUrls.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handleEnded = () => {
    if (currentSongIndex < currentSongUrls.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.addEventListener("ended", handleEnded);
      return () => {
        audioRef.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioRef, handleEnded]);

  useEffect(() => {
    if (audioRef) {
      audioRef.currentTime = 0;
    }
  }, [audioRef, currentSongIndex]);

  const isMultipleSongs = currentSongUrls.length > 1;

  return (
    <div className="audio-player-global">
      <audio ref={setAudioRef} src={currentSongUrls[currentSongIndex]} controls autoPlay />
      <div>
        <button onClick={togglePlayPause}>
        </button>
        {isMultipleSongs && (
          <>
            <button onClick={playPreviousSong}>Previous</button>
            <button onClick={playNextSong}>Next</button>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isPlaying: state.isPlaying,
  currentSongUrls: state.currentSongUrls,
});

const mapDispatchToProps = {
  playMusic,
  pauseMusic,
  setCurrentSongUrls,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerGlobal);
