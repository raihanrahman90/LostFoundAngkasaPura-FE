import { defaultAdminRequest } from "./Admin";

export const getDetailClaim = async({id})=>{
    return await defaultAdminRequest({url:"/Admin/Item-Claim/"+id,method:"get",body:""});
}
export const getListClaim = async ({page, status})=>{
    let url = "/Admin/Item-Claim?page="+page;
    if(status!=null) url = url+"&status="+status;
    return await defaultAdminRequest({url:url, method:"get",body:""});
}