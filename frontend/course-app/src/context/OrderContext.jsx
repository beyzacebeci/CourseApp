import React, { createContext, useContext, useState } from "react";
import { postAPI, getAPI } from "../services/apiService";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = async (paymentId, totalPrice, courseIds) => {
    const userId = localStorage.getItem("userId");

    const orderData = {
      userId: parseInt(userId),
      paymentId: paymentId,
      totalPrice: totalPrice,
      courseIds: courseIds,
    };

    const response = await postAPI("Orders", orderData);
    return response;
  };

  const fetchUserOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const response = await getAPI(`Orders/user/${userId}`);
    if (response.success) {
      setOrders(response.data.data);
    }
    console.log(orders);

    return response;
  };

  return (
    <OrderContext.Provider value={{ createOrder, orders, fetchUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
