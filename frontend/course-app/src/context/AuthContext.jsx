import { createContext, useState, useContext } from "react";
import { postAPI } from "../services/apiService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const login = async (form) => {
    const url = "/authentication/login";
    try {
      const res = await postAPI(url, form);
      const token = res.data.token;

      // Set token
      localStorage.setItem("token", token);

      // Decode token
      const tokenData = token.split(".")[1];
      const decodedTokenJsonData = window.atob(tokenData);
      const decodedTokenData = JSON.parse(decodedTokenJsonData);

      // Set username, userıd, roles
      const username =
        decodedTokenData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      localStorage.setItem("username", username);

      const userId =
        decodedTokenData[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      localStorage.setItem("userId", userId);

      // Set is admin value
      const roles =
        decodedTokenData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      //exp date token geçerlilik süresi
      const exp = decodedTokenData["exp"];
      localStorage.setItem("tokenExpiration", exp);

      const isAdmin = roles.includes("Admin");
      localStorage.setItem("isAdmin", isAdmin);

      return {
        success: true,
        message: t("loginSuccess"),
      };
    } catch (error) {
      return {
        success: false,
        message: t("userNamePasswordError"),
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
