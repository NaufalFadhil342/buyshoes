import { supabase } from "../utils/supabase";
import { categoryIcons } from "../LocalData/products-category-icons";

export const getProductCategories = async () => {
  const { data, error } = await supabase
    .from("product_by_category")
    .select("*, products(name, category, price, slug)");

  if (error) throw error;

  const grouped = data.reduce((acc, item) => {
    const key = item.products?.category;
    if (!key) return acc;
    (acc[key] ??= []).push(item);
    return acc;
  }, {});

  return Object.entries(categoryIcons).map(([key, icon]) => ({
    category: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    icon,
    items: grouped[key] ?? [],
  }));
};
