import { defaultAdminRequest } from "./Admin";
export const getListUser = async ({page, name})=>{
    var url = "/Admin/User?";
    url = url+ "&page="+page;
    if(name.trim()!="") url = url+ "&name="+name;
    return defaultAdminRequest({url:url,method:"get",body:""});
}

export const getDetailUser = async(id)=>{
    var url = "/Admin/User/"+id;
    return defaultAdminRequest({url:url,method:"get",body:""});
}