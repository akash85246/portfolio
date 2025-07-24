// src/socket.js
import { io } from "socket.io-client";

// replace with your backend URL or localhost
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL ; 

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false, 
});

export default socket;