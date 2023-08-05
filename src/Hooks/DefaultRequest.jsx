import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const defaultRequest = axios.create({
   baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authRequest = ()=> {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+ Cookies.get('token')
    },
  })
};

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {"Authorization": 'Bearer '+ Cookies.get('token')}
});

