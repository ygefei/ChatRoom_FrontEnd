import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch,useStore } from 'react-redux';
import { updateCurrRoom, updateRoomListLog, updateSelectedRoomLog, myjoinRoom, loadRoom, myleaveRoomList, myleaveRoomSelected, otherjoinRoom, otherLeaveRoom } from './actions/actions';

const WebSocketContext = createContext(null);
const WS_BASE = "https://comp426-chatroom.herokuapp.com";

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();
    const store = useStore();

    //send message
    const sendMessage = (room_id, message) => {
        const payload = {
            room_id: room_id,
            message: message
        }
        socket.emit("message", JSON.stringify(payload));
        dispatch(updateSelectedRoomLog(message));
        dispatch(updateCurrRoom(payload));
    }

    //join room
    const joinRoom = async (room_id) => {
        try {
            const response = await myjoinRoom(room_id);
            dispatch(response);
            const roomResponse = await loadRoom(room_id);
            dispatch(roomResponse);
            socket.emit("join", JSON.stringify(room_id));
        }catch(error){
            console.log(error);
        }    
    }

    //leave room
    const leaveRoom = (room_id) => {
        dispatch(myleaveRoomList);
        dispatch(myleaveRoomSelected);
        socket.emit("leave", JSON.stringify(room_id));
    }


    if (!socket) {
        socket = io.connect(WS_BASE);

        //listen message
        socket.on("message", (data) => {
            const payload = JSON.parse(data);
            const room_id = payload.room_id;
            const message = payload.message;
            if(room_id === store.selectedRoomReducer.room_id){
                dispatch(updateSelectedRoomLog(message))
                dispatch(updateCurrRoom(payload));
            }else{
                dispatch(updateRoomListLog(payload));
            }
        })

        //listen other join
        socket.on("join", (data) => {
            const payload = JSON.parse(data);
            const room_id = payload.room_id;
            const user = payload.user;
            if(room_id === store.selectedRoomReducer.room_id){
                dispatch(otherjoinRoom(user));
            }
        })

        //listen other leave
        socket.on("leave", (data) => {
            const payload = JSON.parse(data);
            const room_id = payload.room_id;
            const username = payload.username;
            if(room_id === store.selectedRoomReducer.room_id){
                dispatch(otherLeaveRoom(username));
            }
        })

        ws = {
            socket: socket,
            sendMessage,
            joinRoom,
            leaveRoom
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}