import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../services/apiService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const addUser = async (data) => {
    const url = "/authentication";
    return await postAPI(url, data)
      .then((res) => res)
      .catch((error) => error);
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

  const values = { handleAddUser };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
