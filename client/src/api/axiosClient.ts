import axios, { ParamsSerializerOptions } from "axios";
import qs from "qs";
const BASE_URL = "http://localhost:5002/api/";

const getToken = () => {
  localStorage.getItem("token");
};
const axiosCilent = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: {
    encode: (params) => {
      return qs.stringify(params);
    },
  },
});

axiosCilent.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosCilent.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosCilent;
