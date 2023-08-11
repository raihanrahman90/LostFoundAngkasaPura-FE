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

export const defaultAdminRequest = async({
    url, method, body
})=>{
    try{
        console.log("1");
        var accessToken = Cookies.get("token");
        console.log("isi accss token");
        console.log(accessToken);
        if(accessToken==undefined){
            console.log("access token unddefined");
            throw new Error("accessToken tidak ditemukan");
        }
        console.log("access tokennya ada")
        console.log("isi url");
        console.log(url);
        var res = await callApiWithToken(url, method, body, accessToken);
        console.log("ini isi rest dari default admin resut");
        return res;
    }catch(e){
        try{
            console.log("coba ambil access token")
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
        console.log("ini gagal ambil accesstoken")
        navigate("/admin");
    }
  }
  