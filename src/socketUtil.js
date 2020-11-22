import io from "socket.io-client";
const socket = io("https://comp426-chatroom.herokuapp.com"); 
export default socket;