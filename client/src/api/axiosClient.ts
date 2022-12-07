import axios, { ParamsSerializerOptions } from "axios";
import qs from "qs";
import ErrorResult from "../interface/ErrorResult";
const BASE_URL = "http://localhost:5002/api/";

const getToken = () => localStorage.getItem("token");;
const axiosClient = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: {
    encode: (params) => {
      return qs.stringify(params);
    },
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      //return alert(err);
    }
    const error = err.response as ErrorResult;
    throw error;
  }
);

export default axiosClient;
