import { defaultUserRequest } from "./Default";


export const countNotification= ()=>{
    var url = '/auth/notification/count';
    return defaultUserRequest(url, 'get', "");
}

export const getListNotification = async ()=>{
    var url = '/auth/notification';
    return defaultUserRequest(url, 'get', "");
}