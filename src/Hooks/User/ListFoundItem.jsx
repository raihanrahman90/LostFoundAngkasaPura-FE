import { defaultUserRequest } from "./Default";


export const getListFoundItem= (page, size, name, category,foundDateStart, foundDateEnd)=>{
    var url = '/Item-Found?page='+page;
    url = url+"&size="+size;
    if(name) url=url+"&name="+name;
    if(category) url = url+"&category="+category;
    if(foundDateStart) url = url+"&foundDateStart="+foundDateStart;
    if(foundDateEnd) url = url+"&foundDateEnd="+foundDateEnd;
    return defaultUserRequest(url, 'get', "");
}

export const getDetailFoundItem= (id)=>{
    var url = '/Item-Found/'+id;
    return defaultUserRequest(url, 'get', "");
}