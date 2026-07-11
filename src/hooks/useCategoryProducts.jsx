import { useProducts } from "./useApi";
import { useState } from "react";

export const useCategoryProducts = (gender) => {
  const { products, loading, error } = useProducts();
  const [selectGender, setSelectGender] = useState(gender);

  const matchesGender = (item, targetGender) =>
    item?.product_by_category?.some(
      (cat) => cat.gender === targetGender || cat.gender === "unisex",
    );

  const filteredProducts = gender
    ? (products?.filter((item) => matchesGender(item, gender)) ?? [])
    : (products ?? []);

  return {
    products: filteredProducts,
    loading,
    error,
    selectGender,
    setSelectGender,
  };
};
