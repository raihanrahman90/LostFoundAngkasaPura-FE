import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_API_URL;
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
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      });
      return response.data;
  } catch (e) {
    throw e.response;
  }
}
