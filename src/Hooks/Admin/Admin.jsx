import Cookies from "js-cookie";
import { defaultRequest, callApiWithToken, downloadWithToken } from "../DefaultRequest"
import { CookiesAdmin } from "../../Constants/Cookies";

export const login = async ({
    email, password
})=>{
    return await defaultRequest
    .post(`/admin/Admin/login`, {
        email:email,
        password:password
    })
};

export const defaultAdminRequest = async({
    url, method, body
})=>{
    try{
        var accessToken = Cookies.get(CookiesAdmin.tokenAdmin);
        if(accessToken==undefined){
            console.log("access token undefined");
        }
        var res = await callApiWithToken(url, method, body, accessToken);
        return res;
    }catch(e){
        try{
            await getAccessToken();
            var res = await callApiWithToken(url, method, body, accessToken);
            return res.data;
        }catch(e){
            throw e
        }
    }
}

export const blobAdminRequest = async({
    url, method, body
})=>{
    try{
        var accessToken = Cookies.get(CookiesAdmin.tokenAdmin);
        if(accessToken==undefined){
            console.log("access token undefined");
        }
        var res = await downloadWithToken(url, method, body, accessToken);
        return res;
    }catch(e){
        try{
            await getAccessToken();
            var res = await downloadWithToken(url, method, body, accessToken);
            return res.data;
        }catch(e){
            throw e
        }
    }
}

export const getAccessToken = async ()=>{
    try {
        var refreshToken = Cookies.get(CookiesAdmin.refreshAdmin);
        var accessToken = await callApiWithToken("admin/admin/access-token?refreshToken="+refreshToken, 'get', '','')
        return accessToken.accessToken;
    }catch(e){
        return e;
    }
  }
export const getListAdmin = async ({page, name, email, access})=>{
    try{
        var url = "admin/admin?page="+page;
        // console.log(name==null);
        if(name !== null) {url= url+"&name="+name;}
        if(email !== null) {url = url+"&email="+email;}
        if(access !== null) {url = url+"&access="+access;}
        var res = await defaultAdminRequest({url:url, method:"get", body:"",  });
        return res;
    }catch(e){
        return e
    }
}
export const createAdmin = async ({body})=>{
    try{
        var res = await defaultAdminRequest({url:"/admin/admin", method:"post",body:body});
        return res;
    }catch(e){
        return e;
    }
}

export const deletAdmin = async (id)=>{
    return defaultAdminRequest({url:`admin/admin/${id}`, method:"delete", body:{}});
}


export const getListNotification = async()=>{
    return defaultAdminRequest({url:"/admin/admin/notification", method:"get", body:""});
}
export const getProfile = async()=>{
    return defaultAdminRequest({url:"/admin/admin/profile", method:"get", body:""});
}
export const updateProfile = async({email, updatePassword, password})=>{
    return defaultAdminRequest({url:"/admin/admin/profile", method:"post", body:{email:email, updatePassword:updatePassword, password:password}})
}
export const downloadExcel = async({startDate, endDate})=>{
    var url = "/admin/dashboard/download?";
    if(startDate.trim()!="") url=url+"startDate="+startDate;
    if(endDate.trim()!="") url = url+"&endDate="+endDate;
    return defaultAdminRequest({url:url, method:"get",body:""});
}

export const getDetailAdmin = async ({ id }) => {
    return await defaultAdminRequest({ url: "/admin/admin/" + id, method: "get", body: "" });
}

export const resetPassword = async ({ id }) => {
    return await defaultAdminRequest({ url: "/admin/admin/" + id + "/reset-password", method: "post", body: "" });
}
