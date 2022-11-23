import axiosCilent from "./axiosClient";

const authApi = {
  register: (params: any) => {
    axiosCilent.post("auth/register", params);
  },
  login: (params: any) => {
    axiosCilent.post("auth/login", params);
  },
};

export default authApi;
