import axios from "axios";

export const spotyFansApi = axios.create({
  // baseURL: "https://spootyfans.onrender.com",
  baseURL: "http://localhost:3001",
});

export const postMusicApi = axios.create({
  baseURL: "spotyfans-microservice-production.up.railway.app",
});

export const postImageApi = axios.create({
  baseURL: "https://postimagemicroservice-production.up.railway.app",
});
