import { defaultAdminRequest } from "./Admin";

export const getDetailClaim = async({id})=>{
    return await defaultAdminRequest({url:"/Admin/Item-Claim/"+id,method:"get",body:""});
}
export const getListClaim = async ({page})=>{
    return await defaultAdminRequest({url:"/Admin/Item-Claim?page="+page, method:"get",body:""});
}