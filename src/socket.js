import socketioClient from "socket.io-client";

let socket;

const connectSocketio = (user_id) => {
    socket = socketioClient("http://localhost:3001", {
        query: `user_id=${user_id}`
    })
}

export {socket, connectSocketio};