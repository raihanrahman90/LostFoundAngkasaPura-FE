import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const defaultRequest = axios.create({
   baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer '+ Cookies.get('token')
  
  },
});

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {"Authorization": 'Bearer '+ Cookies.get('token')}
});

export const adminAuthRequest = ({
  url, method, body
})=>{
  try{
    var accessToken = Cookies.get('token');
    var response = _callApiWithToken(url, method, body,)
  }catch(e){

  }
}

export const getAccessToken = ()=>{
  try {

  }catch(e){
    throw ErrorFactory.getFromHttpError(e, url,'web API');
  }
}

const _callApiWithToken = async({
  url,
  method,
  dataToSend,
  accessToken})=>{

  try {

      const response = await axios.request({
          url,
          method,
          data: dataToSend,
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      });
      return response.data;
  } catch (e) {
      throw ErrorFactory.getFromHttpError(e, url, 'web API');
  }
};
