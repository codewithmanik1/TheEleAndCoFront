import axios from "axios";


 const API_BASE_URL = "http://localhost:7072";

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "ngrok-skip-browser-warning": "true",
  },
});


export default apiInstance;
