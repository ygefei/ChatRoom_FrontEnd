import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch,useStore } from 'react-redux';
import { updateCurrRoom, updateRoomListLog, updateSelectedRoomLog, myjoinRoom, loadRoom, myleaveRoomList, myleaveRoomSelected, otherjoinRoom, otherLeaveRoom } from './actions/actions';

const WebSocketContext = createContext(null);
const WS_BASE = "https://comp426-chatroom.herokuapp.com";

export { WebSocketContext }

export default ({ children }) => {
    // let socket;
    // let ws;

    // const dispatch = useDispatch();
    // const store = useStore();

    //connect

    // ws = {
    //     socketConnect,
    //     sendMessage,
    //     joinRoom,
    //     leaveRoom,
    //     socketClose
    // }


    // return (
    //     <WebSocketContext.Provider value={ws}>
    //         {children}
    //     </WebSocketContext.Provider>
    // )
}