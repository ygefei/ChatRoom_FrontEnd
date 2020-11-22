import {createChatRoom, joinChatRoom,loadHomepage,loadSelectedRoomApi} from '../api';


//fetch data action
export const LOAD_USER = "LOAD_USER";
export const LOAD_ROOMLIST = "LOAD_ROOMLIST";
export const LOAD_SELECTED_ROOM = "LOAD_SELECTED_ROOM";


export function loadUser(payload){
    return {
        type: LOAD_USER,
        payload
    }
}

export function loadRoomlist(payload){
    return {
        type: LOAD_ROOMLIST,
        payload
    }
}

export function loadSelectedRoom(payload){
    return {
        type: LOAD_SELECTED_ROOM,
        payload
    }
}

export async function loadPage(userToken) {
        try{
            const response = await loadHomepage(userToken);
            const user = response.user;
            const roomList = response.chatrooms;
            return {
                loadUser: () => loadUser(user),
                loadRoomlist:() => loadRoomlist(roomList)
            }

        }catch(error){
            console.log(error);
        }
    
}

export async function loadRoom(room_id,userToken){
    try{
        const response = await loadSelectedRoomApi(room_id,userToken);
        return loadSelectedRoom(response);
    }catch(error){
        console.log(error);
    }
}


//action types
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";


//actions 
export function createRoomRequest(){
    return {
        type: CREATE_ROOM_REQUEST
    }
}

export function createRoomSuccess(payload){
    return {
        type: CREATE_ROOM_SUCCESS,
        payload
    }
}

export function createRoomError(error){
    return {
        type: CREATE_ROOM_ERROR,
        error
    }
}

export function createRoom(room_name,profile,userToken) {
    return async function (dispatch) {
        dispatch(createRoomRequest());
        try{
            const response = await createChatRoom(room_name,profile,userToken);
            const payload = {
                room_id: response.room_id,
                room_name: room_name,
                profile: profile
            }
            dispatch(createRoomSuccess(payload));
            return response.room_id;
        }catch(error){
            dispatch(createRoomError(error));
        }
    }
}


export const MY_JOIN_ROOM_SUCCESS = "MY_JOIN_ROOM_SUCCESS";
export const OTHER_JOIN_ROOM_SUCCESS = "OTHER_JOIN_ROOM_SUCCESS";

export function myjoinRoomSuccess(payload){
    return {
        type: MY_JOIN_ROOM_SUCCESS,
        payload
    }
}

export function otherjoinRoom(payload){
    return {
        type: OTHER_JOIN_ROOM_SUCCESS,
        payload
    }
}

export async function myjoinRoom(room_id,userToken) {
    try{
        const response = await joinChatRoom(room_id,userToken);
        const payload = {
            room_id: room_id,
            room_name: response.room_name,
            profile: response.profile
        }
        return myjoinRoomSuccess(payload);
    }catch(error){
        console.log(error);
    }
}



export const UPDATE_CURR_ROOM = "UPDATE_CURR_ROOM";
export const UPDATE_ROOMLIST_LOG = "UPDATE_CURR_ROOM";
export const UPDATE_SELECTED_ROOM_LOG = "UPDATE_SELECTED_ROOM_LOG";


export function updateCurrRoom(payload) {
    return {
        type: UPDATE_ROOMLIST_LOG,
        payload
    }
}

export function updateRoomListLog(payload) {
    return {
        type: UPDATE_ROOMLIST_LOG,
        payload
    }
}

export function updateSelectedRoomLog(payload) {
    return {
        type: UPDATE_SELECTED_ROOM_LOG,
        payload
    }
}

export const MY_LEAVE_ROOM_LIST = "MY_LEAVE_ROOM_LIST";
export const MY_LEAVE_ROOM_SELECTED = "MY_LEAVE_ROOM_SELECTED";
export const OTHER_LEAVE_ROOM = "OTHER_LEAVE_ROOM";

export function myleaveRoomList(payload) {
    return {
        type: MY_LEAVE_ROOM_LIST,
        payload,
    }
}

export function myleaveRoomSelected(payload) {
    return {
        type: MY_LEAVE_ROOM_SELECTED,
        payload,
    }
}


export function otherLeaveRoom(payload) {
    return {
        type: OTHER_LEAVE_ROOM,
        payload,
    }
}


export const READ_MESSAGE = "READ_MESSAGE";
export function readMessage(payload) {
    return {
        type: READ_MESSAGE,
        payload
    }
}