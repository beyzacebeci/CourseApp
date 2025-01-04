import React, { createContext, useContext } from "react";
import { postAPI } from "../services/apiService";
const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const processPayment = async (paymentData) => {
    const userId = localStorage.getItem("userId");
    const paymentRequest = {
      userId: parseInt(userId),
      ...paymentData,
    };

    const response = await postAPI("Payments", paymentRequest);
    return response;
  };

  return (
    <PaymentContext.Provider value={{ processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
