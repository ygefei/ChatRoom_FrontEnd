import axios from 'axios';

const API_BASE = "https://comp426-chatroom.herokuapp.com";

export function login(username, password) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/login`,
            baseURL: API_BASE,
            data: {
              username:username,
              password:password
            }
        });
        if(result.status === 200) {
            resolve();
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

export function loadHomepage() {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/homepage`,
        });
        if(result.status === 200) {
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function loadSelectedRoomApi(room_id) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/chatroom/get`,
            data: {
                room_id:room_id
              },
            withCredentials: true
        });
        if(result.status === 200) {
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function logout() {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'get',
            url: `${API_BASE}/logout`,
        });
        if(result.status === 200) {
            resolve();
        }else{
            reject(new Error(result.statusText));
        }
    });
}

export function createChatRoom(room_name,profile) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/chatroom/create`,
            data: {
              room_name:room_name,
              profile:profile
            }
        });
        if(result.status === 200) {
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
    
}

export function joinChatRoom(room_id) {
    return new Promise(async(resolve,reject) => {
        const result = await axios({
            method: 'post',
            url: `${API_BASE}/chatroom/join`,
            data: {
              room_id:room_id,
            }
        });
        if(result.status === 200) {
            resolve(result.data);
        }else{
            reject(new Error(result.statusText));
        }
    });
    
}
