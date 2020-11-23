import io from 'socket.io-client';
import { updateCurrRoom, updateRoomListLog, updateSelectedRoomLog, myjoinRoom, loadRoom, myleaveRoomList, myleaveRoomSelected, otherjoinRoom, otherLeaveRoom } from './actions/actions';
export let socket = null;

export const socketConnect = (token,dispatch,selectRoomId) => {
    socket = io("https://comp426-chatroom.herokuapp.com");
    socket.on("connect", () => {
      socket.emit("init",token);
    });

    socket.on('init', (data) => {
        console.log(data);
    });

    socket.on('err', (data) => {
        console.log(data);
    });

    //listen message
    socket.on("message", (data) => {
        const room_id = data.room_id;
        const timestamp = new Date(data.timestamp).toISOString();
        const message = {
            username:data.username,
            nickname:data.nickname,
            text:data.text,
            timestamp:timestamp
        }
        if(room_id === selectRoomId){
            dispatch(updateSelectedRoomLog(message));
            dispatch(updateCurrRoom({
                room_id:room_id,
                last_message:message
            }));
        }else{
            dispatch(updateRoomListLog({
                room_id:room_id,
                last_message:message
            }));
        }
    });

    //listen other join
    socket.on("join", (data) => {
        const room_id = data.room_id;
        const user = data.user;
        if(room_id === selectRoomId){
            dispatch(otherjoinRoom(user));
        }
    });

    //listen other leave
    socket.on("leave", (data) => {
        const room_id = data.room_id;
        const username = data.username;
        if(room_id === selectRoomId){
            dispatch(otherLeaveRoom(username));
        }
    });
}


//send message
export const sendMessageSocket = (dispatch,room_id,username,nickname,text,timestamp) => {
    dispatch(updateSelectedRoomLog({
        username:username,  
        nickname:nickname,
        text:text,
        timestamp:timestamp
    }));
    dispatch(updateCurrRoom({
        room_id:room_id,
        last_message:{
            username:username,  
            nickname:nickname,
            text:text,
            timestamp:timestamp
        }
    }));
    socket.emit("message", {
        room_id: room_id,
        message: text,
    });
}

 //join room
export const joinRoomSocket = async (dispatch,room_id,userToken) => {
    try {
        const response = await myjoinRoom(room_id,userToken);
        dispatch(response.action);
        const roomResponse = await loadRoom(room_id,userToken,response.room_name);
        dispatch(roomResponse);
        socket.emit("join", room_id);
    } catch(error){
        console.log(error);
    }    
}

 //leave room
export const leaveRoomSocket = (dispatch,room_id) => {
    dispatch(myleaveRoomList(room_id));
    dispatch(myleaveRoomSelected());
    socket.emit("leave", room_id);
}