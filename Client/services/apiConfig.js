import axios from "axios";

export const spotyFansApi = axios.create({
  baseURL: "https://spootyfans.onrender.com",
  // baseURL: "http://localhost:3001",
});

export const postMusicApi = axios.create({

  baseURL: "https://spotyfans-microservice-production.up.railway.app",
  // baseURL: "http://localhost:4001",

});

export const postImageApi = axios.create({
  baseURL: "https://postimage-production.up.railway.app", 
});
