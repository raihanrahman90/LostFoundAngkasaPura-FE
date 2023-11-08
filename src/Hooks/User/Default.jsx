import Cookies from "js-cookie";
import { defaultRequest, callApiWithToken } from "../DefaultRequest"
import { CookiesAdmin, CookiesUser } from "../../Constants/Cookies";
export const login = async ({
    email, password
})=>{
    return defaultRequest
    .post(`/auth/login`, {
        email:email,
        password:password
    })
};

export const register = async ({
    email, password, name, phone
})=>{
    return defaultRequest
    .post(`/auth/register`, {
        email:email,
        password:password,
        name:name,
        phone:phone
    })
};

export const defaultUserRequest = async(
    url, method, body
)=>{
    try{
        var accessToken = Cookies.get(CookiesUser.tokenUser);
        var res = await callApiWithToken(url, method, body, accessToken);
        return res;
    }catch(e){
        try{
            if(e.status===401){
                var accessToken = await getAccessToken();
                var res = await callApiWithToken(url, method, body, accessToken);
                Cookies.set(CookiesUser.tokenUser, accessToken);
                return res;
            }else{
                throw e;
            }
        }catch(e){
            throw e
        }
    }
}

export const getAccessToken = async ()=>{
    try {
        var refreshToken = Cookies.get(CookiesAdmin.refreshAdmin);
      var accessToken = await callApiWithToken("auth/access-token?refreshToken="+refreshToken, 'get', '','')
      return accessToken;
    }catch(e){
        console.log("ini error access token")
        return e;
    }
}

export const checkAccessToken = async ()=>{
    return await defaultUserRequest("auth/access-token/check", "get", "");
}

export const requestCodeForgotPassword = async({email})=>{
    return await defaultRequest.post("auth/forgot-password/code", {email:email});
}

export const requestPasswordReset = async({email, code, password})=>{
    return await defaultRequest.post("auth/forgot-password/reset-password", {email:email, code:code, password:password});
}