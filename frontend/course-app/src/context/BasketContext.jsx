import React, { createContext, useState, useContext, useEffect } from "react";

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState(() => {
    const savedItems = localStorage.getItem("basketItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }, [basketItems]);

  const addToBasket = (course) => {
    const isExist = basketItems.find((item) => item.id === course.id);
    if (!isExist) {
      setBasketItems((prevItems) => [...prevItems, course]);
    }
  };

  const removeFromBasket = (courseId) => {
    setBasketItems((prevItems) =>
      prevItems.filter((item) => item.id !== courseId)
    );
  };

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addToBasket,
        removeFromBasket,
        basketCount: basketItems.length,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
