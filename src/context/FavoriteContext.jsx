import { supabase } from "@/utils/supabase";
import { createContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("favorites")
        .select(
          "*, product:products(name, price, category, created_at, product_by_category(images))",
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Failed to load favorites:", error);
      } else {
        setFavorites(data);
      }
      setLoading(false);
    };

    loadFavorites();
  }, [user]);

  const isFavorite = (productId) => {
    return favorites.some((item) => item.product_id === productId);
  };

  const toggleFavorite = async (product) => {
    if (!user) return;

    const alreadyFavorited = isFavorite(product.id);

    setFavorites((prev) =>
      alreadyFavorited
        ? prev.filter((item) => item.id !== product.id)
        : [product, ...prev],
    );

    if (alreadyFavorited) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", product.id);

      if (error) {
        console.error("Failed to remove favorite:", error);
        setFavorites((prev) => [product, ...prev]);
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, product_id: product.id });

      if (error) {
        console.error("Failed to add favorite:", error);
        setFavorites((prev) => prev.filter((item) => item.id !== product.id));
      }
    }
  };

  const value = { favorites, isFavorite, toggleFavorite, loading };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };
