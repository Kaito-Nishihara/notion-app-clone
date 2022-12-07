import authApi from "../api/authApi";
import { User } from "../models/User";

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const res = await authApi.verifyToken();
      const user = res.data as User;
      return user;
    } catch(err) {
      return false;
    }
  },
};

export default authUtils;
