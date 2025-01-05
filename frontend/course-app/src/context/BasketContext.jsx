import React, { createContext, useContext, useState, useEffect } from "react";
import { getAPI, postAPI, deleteAPI } from "../services/apiService";

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [basketCount, setBasketCount] = useState(0);

  const fetchBasketCount = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const items = await getBasketItems(userId);
        setBasketCount(items.length);
      } catch (error) {
        console.error("Error fetching basket count:", error);
      }
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchBasketCount();
    } else {
      setBasketCount(0);
    }
  }, [localStorage.getItem("userId")]);

  const addToBasket = async (course, userId) => {
    try {
      const request = {
        userId: userId,
        courseId: course.id,
        totalPrice: course.price,
      };

      const response = await postAPI("BasketItems", request);

      if (response.success) {
        await fetchBasketCount();
        return { success: true };
      } else {
        throw new Error(
          response.data.errorMessage || "Failed to add item to basket"
        );
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getBasketItems = async (userId) => {
    try {
      const response = await getAPI(`BasketItems/user/${userId}`);
      return response.success ? response.data.data : [];
    } catch (error) {
      console.error("Error fetching basket items:", error);
      return [];
    }
  };

  const removeFromBasket = async (basketItemId) => {
    try {
      const response = await deleteAPI(`BasketItems/${basketItemId}`);

      if (response.success) {
        await fetchBasketCount();
      } else {
        throw new Error(
          response.data.errorMessage || "Failed to remove item from basket"
        );
      }
    } catch (error) {
      console.error("Error removing from basket:", error);
    }
  };

  const resetBasket = () => {
    setBasketCount(0);
  };

  const deleteAllBasketItems = async () => {
    try {
      const response = await deleteAPI("BasketItems/delete-all");

      if (response.success) {
        setBasketCount(0);
      } else {
        throw new Error(response.data.errorMessage || "Failed to clear basket");
      }
    } catch (error) {
      console.error("Error clearing basket:", error);
    }
  };

  return (
    <BasketContext.Provider
      value={{
        addToBasket,
        getBasketItems,
        basketCount,
        fetchBasketCount,
        removeFromBasket,
        resetBasket,
        deleteAllBasketItems,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
