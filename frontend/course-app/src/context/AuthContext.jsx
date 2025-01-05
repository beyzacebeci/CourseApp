import { createContext, useState, useContext, useEffect } from "react";
import { postAPI } from "../services/apiService";
import { useBasket } from "./BasketContext";
import { useTranslationContext } from "./TranslationContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { t } = useTranslationContext();

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
          message: "signIn.invalid",
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

      await basket.fetchBasketCount();

      return {
        success: true,
        message: "signIn.success",
      };
    } catch (error) {
      return {
        success: false,
        message: "signIn.error",
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

  const updateLocalUsername = (newUsername) => {
    localStorage.setItem("username", newUsername);
    setUser((prev) => ({
      ...prev,
      username: newUsername,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLocalUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
