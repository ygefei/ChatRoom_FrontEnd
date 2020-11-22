import axios from 'axios';

const API_BASE = "https://comp426-chatroom.herokuapp.com";

export function login(username, password) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/login`,
            data: {
              username:username,
              password:password
            }
        });
        if(result.status === 200) {
            console.log(result.data);
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function register(username, password, nickName) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/signup`,
            data: {
              username:username,
              password:password,
              nickName:nickName
            }
        });
        if(result.status === 200) {
            resolve();
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function loadHomepage(userToken) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url:`${API_BASE}/homepage`,
            data:{
                token:userToken
            }
        });
        if(result.status === 200) {
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function loadSelectedRoomApi(room_id,userToken) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/chatroom/get`,
            data: {
                room_id:room_id,
                token:userToken
              },
        });
        if(result.status === 200) {
            console.log(result.data);
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function logout(userToken) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/logout`,
            data:{
                token:userToken
            }
        });
        if(result.status === 200) {
            resolve();
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function createChatRoom(room_name,profile,userToken) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/chatroom/create`,
            data: {
              room_name:room_name,
              profile:profile,
              token:userToken
            }
        });
        if(result.status === 200) {
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
    
}

export function joinChatRoom(room_id,userToken) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/chatroom/join`,
            data: {
              room_id:room_id,
              token:userToken
            }
        });
        if(result.status === 200) {
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
    
}
