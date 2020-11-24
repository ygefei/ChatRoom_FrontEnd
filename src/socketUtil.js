import io from 'socket.io-client';
import { updateCurrRoom, updateRoomListLog, updateSelectedRoomLog, myjoinRoom, loadRoom, myleaveRoomList, myleaveRoomSelected, otherjoinRoom, otherLeaveRoom } from './actions/actions';
export let socket = null;

export const socketConnect = (token,dispatch) => {
    socket = io("https://comp426-chatroom.herokuapp.com");
    socket.on("connect", () => {
      socket.emit("init",token);
    });

    //listen message
    socket.on("message", async(data) => {
        const timestamp = new Date(data.timestamp).toISOString();
        const message = {
            username:data.username,
            nickname:data.nickname,
            text:data.text,
            profile:data.profile,
            timestamp:timestamp
        }
        dispatch(updateSelectedRoomLog({
            room_id:data.room_id,
            message:message
        }));
        await dispatch(updateCurrRoom({
            room_id:data.room_id,
            last_message:{
                username:data.username,
                nickname:data.nickname,
                text:data.text,
                timestamp:timestamp
            }
        }));
        dispatch(updateRoomListLog({
            room_id:data.room_id,
            last_message:{
                username:data.username,
                nickname:data.nickname,
                text:data.text,
                timestamp:timestamp
            }
        }));
        
    });

    //listen other join
    socket.on("join", (data) => {
        const user = {
            room_id:data.room_id,
            nickname:data.nickname,
            username:data.username,
            profile:data.profile
        }
        dispatch(otherjoinRoom(user));
        
    });

    //listen other leave
    socket.on("leave", (data) => {
        dispatch(otherLeaveRoom({
            room_id:data.room_id,
            username:data.username
        }));
    });
}


//send message
export const sendMessageSocket = (dispatch,room_id,username,nickname,text,profile,timestamp) => {
    dispatch(updateSelectedRoomLog({
        room_id:room_id,
        message:{
            username:username,  
            nickname:nickname,
            text:text,
            profile:profile,
            timestamp:timestamp
        }
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
        alert("Error");
    }    
}

 //leave room
export const leaveRoomSocket = (dispatch,room_id) => {
    dispatch(myleaveRoomList(room_id));
    dispatch(myleaveRoomSelected());
    socket.emit("leave", room_id);
}