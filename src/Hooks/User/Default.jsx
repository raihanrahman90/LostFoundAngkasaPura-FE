import Cookies from "js-cookie";
import { defaultRequest, callApiWithToken } from "../DefaultRequest"
import { useNavigate } from "react-router-dom";
export const login = async ({
    email, password
})=>{
    return defaultRequest
    .post(`/auth/login`, {
        email:email,
        password:password
    })
};

export const defaultUserRequest = async(
    url, method, body
)=>{
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
            return res;
        }catch(e){
            throw e
        }
    }
}

export const getAccessToken = async ()=>{
    try {
      var accessToken = await callApiWithToken("auth/access-token", 'get', '','')
      return accessToken;
    }catch(e){
        return e;
    }
}

export const checkAccessToken = async ()=>{
    return await defaultUserRequest("auth/access-token/check", "get", "");
}
export const logout = async ()=>{
    return await defaultUserRequest("auth/logout", "get", "");
}