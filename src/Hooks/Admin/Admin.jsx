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
        return res.data
    })
    .catch((error)=>{
        console.error(new Error("TOLOOOOOOONG"));
    });
};

export const defaultAdminRequst = async({
    url, method, body
})=>{
    try{
        var accessToken = Cookies.get("token");
        if(accessToken==undefined){
            throw new Error("accessToken tidak ditemukan");
        }
        var res = await callApiWithToken(url, method, body, accessToken);
        return res.data;
    }catch(e){
        try{
            await getAccessToken();
            var res = await callApiWithToken(url, method, body, accessToken);
            return res.data;
        }catch(e){
            let navigate = useNavigate();
            navigate("/admin");
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
  