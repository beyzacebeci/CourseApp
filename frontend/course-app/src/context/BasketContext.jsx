import React, { createContext, useContext, useState, useEffect } from "react";

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

      const response = await fetch("https://localhost:7146/api/BasketItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to basket");
      }

      // Sepete ürün eklenince sayıyı güncelle
      await fetchBasketCount();
    } catch (error) {
      console.error("Error adding to basket:", error);
    }
  };

  const getBasketItems = async (userId) => {
    try {
      const response = await fetch(
        `https://localhost:7146/api/BasketItems/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch basket items");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching basket items:", error);
      return [];
    }
  };

  const removeFromBasket = async (basketItemId) => {
    try {
      const response = await fetch(
        `https://localhost:7146/api/BasketItems/${basketItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from basket");
      }

      // Sepetten ürün silinince sayıyı güncelle
      await fetchBasketCount();
    } catch (error) {
      console.error("Error removing from basket:", error);
    }
  };

  const resetBasket = () => {
    setBasketCount(0);
  };

  const deleteAllBasketItems = async () => {
    try {
      const response = await fetch(
        "https://localhost:7146/api/BasketItems/delete-all",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to clear basket");
      }

      // Sepet temizlenince sayıyı sıfırla
      setBasketCount(0);
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
