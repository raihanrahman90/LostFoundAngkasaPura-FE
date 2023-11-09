import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const defaultRequest = axios.create({
   baseURL: BASE_URL,
   headers: {
    "Content-Type": "application/json",
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
