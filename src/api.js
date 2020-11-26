import axios from 'axios';

export const API_BASE = "https://comp426-chatroom.herokuapp.com";

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
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function register(username, nickname, password, pictures) {
    const formData = new FormData();
    formData.append('username',username);
    formData.append('nickname',nickname);
    formData.append('password',password);
    formData.append('file', pictures[pictures.length-1][0]);

    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/signup`,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
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

    const formData = new FormData();
    formData.append('room_name',room_name);
    formData.append('file', profile[profile.length-1][0]);
    formData.append('token', userToken);

    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/chatroom/create`,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
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
