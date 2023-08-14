import Cookies from "js-cookie";
import { defaultRequest, callApiWithToken } from "../DefaultRequest"
import { useNavigate } from "react-router-dom";
export const login = async ({
    email, password
})=>{
    return await defaultRequest
    .post(`/admin/Admin/login`, {
        email:email,
        password:password
    });
};

export const defaultAdminRequest = async({
    url, method, body
})=>{
    try{
        var accessToken = Cookies.get("token");
        if(accessToken==undefined){
            console.log("access token unddefined");
            throw new Error("accessToken tidak ditemukan");
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

export const getAccessToken = async ()=>{
    try {
      var accessToken = await callApiWithToken("admin/admin/access-token", 'get', '','')
      return accessToken;
    }catch(e){
        return e;
    }
  }
export const getListAdmin = async ({page, name, email, access})=>{
    try{
        var url = "admin/admin?page="+page;
        console.log(name==null);
        if(name !== null) {url= url+"&name="+name;}
        if(email !== null) {url = url+"&email="+email;}
        if(access !== null) {url = url+"&access="+access;}
        var res = await defaultAdminRequest({url:url, method:"get", body:""});
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