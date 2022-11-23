import axios from "axios";
const BASE_URL = "http://localhost:5002/api/";

const getToken = () => {
  localStorage.getItem("token");
};
const axiosCilent = axios.create({
  baseURL: BASE_URL,
});

axiosCilent.interceptors.request.use(async (config) => {
  return {
    config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosCilent.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosCilent;
