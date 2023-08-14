import { defaultUserRequest } from "./Default";


export const listItemClaim= async (page)=>{
    var url = '/Item-Claim?page='+page;
    return await defaultUserRequest(url, 'get', "");
}

export const getDetailFoundClaim= (id)=>{
    var url = '/Item-Claim/'+id;
    return defaultUserRequest(url, 'get', "");
}

export const createClaim=()=>{
    
}
