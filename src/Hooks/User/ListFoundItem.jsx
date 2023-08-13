import { defaultUserRequest } from "./Default";


export const getListFoundItem= (page, size, name, category,foundDate)=>{
    var url = '/Item-Found?page='+page;
    url = url+"&size="+size;
    if(name) url=url+"&name="+name;
    if(category) url = url+"&category="+category;
    if(foundDate) url = url+"&foundDate="+foundDate;
    return defaultUserRequest(url, 'get', "");
}