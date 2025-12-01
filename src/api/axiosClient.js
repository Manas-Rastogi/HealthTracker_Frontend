import axios from "axios";
const client = axios.create({
  baseURL: "https://healthtracker-5.onrender.com", // change if backend port different
  headers: {
    "Content-Type": "application/json",
  },
});


client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
