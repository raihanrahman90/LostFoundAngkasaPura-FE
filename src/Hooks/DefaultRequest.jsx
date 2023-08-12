import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://103.150.92.47:8081";
axios.defaults.withCredentials = true
export const defaultRequest = axios.create({
   baseURL: BASE_URL,
   headers: {
    "Content-Type": "application/json",
  },
});

export const authRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer '+ Cookies.get('token')
  
  },
});

export const callApiWithToken = async(
  url,
  method,
  dataToSend,
  accessToken)=>{

  try {
      const response = await defaultRequest.request({
          url,
          method,
          data: dataToSend,
          withCredentials:true,
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      });
      return response.data;
  } catch (e) {
      throw e.response.data;
  }
}
