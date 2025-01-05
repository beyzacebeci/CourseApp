import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI, putAPI } from "../services/apiService";
import axios from "axios";

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

  const handleAddUser = async (form) => {
    try {
      const response = await axios.post(
        "https://localhost:7146/api/authentication",
        form
      );

      if (response.status === 201) {
        setTimeout(() => navigate("/signin-page"), 1000);
        return { success: true, message: "auth.userCreatedSuccessfully" };
      }
    } catch (error) {
      console.log("Registration Error:", error.response);

      if (
        error.response?.status === 400 &&
        Array.isArray(error.response.data)
      ) {
        return {
          success: false,
          message: error.response.data[0].description,
        };
      }

      return { success: false, message: "auth.errorOccurred" };
    }
  };

  const updateUser = async (userId, data) => {
    try {
      const response = await putAPI(`Users/${userId}`, data);
      if (response.success) {
        return {
          success: true,
          message: "auth.profileUpdateSuccess",
          data: response.data,
        };
      }
      return {
        success: false,
        message: response.data?.errorMessage?.[0] || "auth.profileUpdateError",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "auth.errorOccurred",
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
          message: "auth.passwordUpdateSuccess",
        };
      }
      return {
        success: false,
        message: response.data?.errorMessage?.[0] || "auth.passwordUpdateError",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "auth.errorOccurred",
      };
    }
  };

  const values = {
    handleAddUser,
    updateUser,
    changePassword,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
