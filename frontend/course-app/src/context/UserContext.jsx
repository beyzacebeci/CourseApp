import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI, putAPI } from "../services/apiService";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const addUser = async (data) => {
    const url = "/authentication";
    return await postAPI(url, data)
      .then((res) => res)
      .catch((error) => error);
  };

  const updateUser = async (userId, data) => {
    try {
      const response = await putAPI(`Users/${userId}`, data);
      if (response.success) {
        return {
          success: true,
          message: "Profil başarıyla güncellendi",
          data: response.data,
        };
      }
      return {
        success: false,
        message:
          response.data?.errorMessage?.[0] ||
          "Güncelleme sırasında bir hata oluştu",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Bir hata oluştu",
      };
    }
  };

  const changePassword = async (userId, passwordData) => {
    try {
      const response = await postAPI(
        `Users/${userId}/change-password`,
        passwordData
      );
      if (response.success) {
        return {
          success: true,
          message: "Şifre başarıyla güncellendi",
        };
      }
      return {
        success: false,
        message:
          response.data?.errorMessage?.[0] ||
          "Şifre güncellenirken bir hata oluştu",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Bir hata oluştu",
      };
    }
  };

  const handleAddUser = async (form) => {
    try {
      const response = await addUser(form);

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/signin-page");
        }, 2000);

        return {
          success: true,
          message: "userCreatedSuccessfully",
        }; // Başarılı durumda
      } else if (response.status === 400) {
        const errorMessages = response.data.data;
        const errorKeys = [
          "DuplicateUserName",
          "PasswordTooShort",
          "PasswordRequiresDigit",
        ];

        for (const key of errorKeys) {
          if (errorMessages[key]) {
            return { success: false, message: errorMessages[key] }; // Hata durumunda
          }
        }
      }
      return { success: false, message: "errorOccurred" }; // Genel hata
    } catch (error) {
      return { success: false, message: "errorOccurred" }; // Yakalanan hata
    }
  };

  const values = {
    handleAddUser,
    updateUser,
    changePassword,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
