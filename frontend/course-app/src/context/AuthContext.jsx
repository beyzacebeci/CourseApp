import { createContext, useState, useContext, useEffect } from "react";
import { postAPI } from "../services/apiService";
import { useBasket } from "./BasketContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
    const token = localStorage.getItem("token");
    if (!token) return null;

    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const roles =
      localStorage.getItem("isEducator") === "true" ? ["Educator"] : [];
    const exp = localStorage.getItem("tokenExpiration");

    // Token süresi dolmuşsa logout yap
    if (exp && Date.now() >= exp * 1000) {
      localStorage.clear();
      return null;
    }

    return {
      username,
      userId,
      roles,
      exp,
    };
  });

  const basket = useBasket();

  const login = async (form) => {
    const url = "/authentication/login";
    try {
      const res = await postAPI(url, form);
      const token = res.data.accessToken;

      if (!token) {
        return {
          success: false,
          message: "Token alınamadı",
        };
      }

      localStorage.setItem("token", token);

      const tokenData = token.split(".")[1];
      const decodedTokenJsonData = window.atob(tokenData);
      const decodedTokenData = JSON.parse(decodedTokenJsonData);

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

      const exp = decodedTokenData["exp"];
      localStorage.setItem("tokenExpiration", exp);

      const roles =
        decodedTokenData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const isEducator = roles.includes("Educator");
      localStorage.setItem("isEducator", isEducator);

      const refreshToken = res.data.refreshToken;
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      setUser({
        username,
        userId,
        roles: Array.isArray(roles) ? roles : [roles],
        exp,
      });

      return {
        success: true,
        message: "Giriş başarılı",
      };
    } catch (error) {
      return {
        success: false,
        message: "Kullanıcı adı veya şifre hatalı",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("username");
    localStorage.removeItem("isEducator");
    localStorage.removeItem("userId");
    localStorage.removeItem("basketItems");

    if (basket && basket.basketItems) {
      basket.removeFromBasket(...basket.basketItems.map((item) => item.id));
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
