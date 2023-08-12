import Cookies from "js-cookie";
import { defaultRequest, callApiWithToken } from "../DefaultRequest"
import { useNavigate } from 'react-router-dom';
export const login = async ({
    email, password
})=>{
    return await defaultRequest
    .post(`/admin/Admin/login`, {
        email:email,
        password:password
    })
    .then((res)=>{
        // console.log("ini datanya",res.data);
        return res.data
    })
    .catch((error)=>{
        console.error(new Error("TOLOOOOOOONG"));
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
        throw {error:401};
    }
  }
  