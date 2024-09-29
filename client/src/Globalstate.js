import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
export const Globalstate = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.post("/user/refresh_token");
      console.log(res.data.accesstoken);
      setToken(res.data.accesstoken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstlogin");
    if (firstLogin) {
      refreshToken();
    }
  }, []);

  const productAPI = ProductAPI();

  const state = {
    token: [token, setToken],
    ProductAPI: productAPI,
    UserAPI: UserAPI({ token }),
  };

  return <Globalstate.Provider value={state}>{children}</Globalstate.Provider>;
};
