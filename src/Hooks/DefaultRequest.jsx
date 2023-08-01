import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const defaultRequest = axios.create({
   baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});