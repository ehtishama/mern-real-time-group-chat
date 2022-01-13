import { io } from "socket.io-client";
import { BASE_URL } from "../constants/api";

export const socket = io(BASE_URL, { autoConnect: false });

socket.on("connect_error", (error) => {
    console.log("Error while connecting socket.io");
    console.error(error);
});
