import { createContext, useEffect, useState } from "react";

const ShoppingContext = createContext();

const ShoppingProvider = ({ children }) => {
  const [shopping, setShopping] = useState(() => {
    const stored = localStorage.getItem("shopping");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("shopping", JSON.stringify(shopping));
  }, [shopping]);

  const isShopping = (productId) => {
    return shopping.some((item) => item.id === productId);
  };

  const toggleShopping = (product) => {
    setShopping((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );
  };

  const value = {
    shopping,
    isShopping,
    toggleShopping,
  };

  return <ShoppingContext value={value}>{children}</ShoppingContext>;
};

export { ShoppingContext, ShoppingProvider };
