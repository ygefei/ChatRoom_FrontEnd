import {
    LOAD_USER,
    LOAD_ROOMLIST,
    LOAD_SELECTED_ROOM, 
    CREATE_ROOM_SUCCESS, 
    MY_JOIN_ROOM_SUCCESS,
    UPDATE_ROOMLIST_LOG,
    UPDATE_SELECTED_ROOM_LOG,
    OTHER_JOIN_ROOM_SUCCESS,
    MY_LEAVE_ROOM_SELECTED,
    MY_LEAVE_ROOM_LIST,
    OTHER_LEAVE_ROOM,
    UPDATE_CURR_ROOM,
    READ_MESSAGE,
    USER_LOG_OUT
} from '../actions/actions';
import { combineReducers } from 'redux';

// const initialState = {
//     user: {
//         username:"",
//         nickname:"",
//         profile:"",
//     },
//     roomList: [
//         {
//             room_id:1,
//             room_name:"COMP 426",
//             profile:"",
//             lastlog: {username,nickname,text,timestamp},
//             unread:0
//         }
//     ],
//     selectedChatRoom: {
//         room_id:1,
//         room_name:"COMP 426",
//         chatLogs: [{username,nickname,text,timestamp}],
//         users:[{nickname,username,profile}],
//     }
    
// }

const userReducer = (state = {    
    username:"",
    nickname:"",
    profile:"",
},action) => {
    switch(action.type){
        case LOAD_USER:
            return Object.assign({},state,{
                ...state,
                username:action.payload.username,
                nickname:action.payload.nickname,
                profile:action.payload.profile,
            });
        case USER_LOG_OUT:
            return Object.assign({},state,{
                    ...state,
                    username:"",
                    nickname:"",
                    profile:"",
                });
        default:
            return state;
    }
}

const roomListReducers = (state = {
    current_roomID: null,
    roomList: []
}, action) => {
    switch(action.type) {
        case LOAD_ROOMLIST:
            const loadList = action.payload.map(item => {
                return {
                    ...item,
                    unread:0
                }
            })
            return Object.assign({}, state, {
                ...state,
                roomList: loadList
            });
        case CREATE_ROOM_SUCCESS:
            const new_room = {
                room_id:action.payload.room_id,
                room_name:action.payload.room_name,
                profile:action.payload.profile,
                last_message: {},
                unread:0
            };
            return Object.assign({}, state, {
                ...state,
                current_roomID: action.payload.room_id,
                roomList: [...state.roomList, new_room]
            });
        case MY_JOIN_ROOM_SUCCESS:
            const join_new_room = {
                room_id:action.payload.room_id,
                room_name:action.payload.room_name,
                profile:action.payload.profile,
                last_message: {},
                unread:0
            };
            return Object.assign({}, state, {
                ...state,
                current_roomID: action.payload.room_id,
                roomList: [...state.roomList, join_new_room]
            });
        case UPDATE_ROOMLIST_LOG:
            if(action.payload.room_id === state.current_roomID) return state;
            const updateLogList = state.roomList.map(item => {
                if(item.room_id === action.payload.room_id){
                    return {
                        ...item,
                        last_message: action.payload.last_message,
                        unread: item.unread+1
                    }
                }
                return item;
            });
            return Object.assign({}, state, {
                ...state,
                roomList: updateLogList
            });
        case UPDATE_CURR_ROOM:
            if(action.payload.room_id !== state.current_roomID) return state;
            const updateCurrRoom = state.roomList.map(item => {
                if(item.room_id === action.payload.room_id){
                    return {
                        ...item,
                        last_message: action.payload.last_message,
                    }
                }
                return item;
            });
            return Object.assign({}, state, {
                ...state,
                current_roomID: action.payload.room_id,
                roomList: updateCurrRoom
            });
        case READ_MESSAGE:
            const updateLogListRead = state.roomList.map(item => {
                if(item.room_id === action.payload){
                    return {
                        ...item,
                        unread: 0
                    }
                }
                return item;
            });
            return Object.assign({}, state, {
                ...state,
                current_roomID: action.payload,
                roomList: updateLogListRead
            });
        case MY_LEAVE_ROOM_LIST:
            const leaveList = state.roomList.filter((item) => item.room_id !== action.payload);
            return Object.assign({}, state, {
                ...state,
                current_roomID: null,
                roomList: leaveList
            });
        case USER_LOG_OUT:
            return Object.assign({},state,{
                    ...state,
                    current_roomID: null,
                    roomList: []
                });
        default:
            return state;
    }
}


const selectedRoomReducer = (state = {
    room_id:null,
    room_name:"",
    chatLogs: [],
    users:[],
},action) => {
    switch(action.type){
        case LOAD_SELECTED_ROOM:
            return Object.assign({},state,{
                ...state,
                room_id:action.payload.room_id,
                room_name:action.payload.room_name,
                chatLogs:action.payload.messages,
                users: action.payload.users,
            });
        case UPDATE_SELECTED_ROOM_LOG:
            if(action.payload.room_id !== state.room_id) return state;
            return Object.assign({},state,{
                ...state,
                chatLogs:[...state.chatLogs,{...action.payload.message}],
            });
        case MY_LEAVE_ROOM_SELECTED:
            return Object.assign({},state,{
                ...state,
                room_id:null,
                room_name:"",
                chatLogs: [],
                users:[],
            });
        case OTHER_JOIN_ROOM_SUCCESS:
            if(action.payload.room_id !== state.room_id) return state;
            return Object.assign({},state,{
                ...state,
                users: [...state.users,action.payload],
            });
        case OTHER_LEAVE_ROOM:
            if(action.payload.room_id !== state.room_id) return state;
            const usersAfterLeave = state.users.filter((item) => item.username !== action.payload.username);
            return Object.assign({},state,{
                ...state,
                users: usersAfterLeave,
            });
        case USER_LOG_OUT:
            return Object.assign({},state,{
                ...state,
                room_id:null,
                room_name:"",
                chatLogs: [],
                users:[],
            });
        default:
            return state;
    }
}

export default combineReducers({
    userReducer,
    roomListReducers,
    selectedRoomReducer
})