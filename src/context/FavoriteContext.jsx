import { supabase } from "@/utils/supabase";
import { createContext, useEffect, useState, useRef } from "react";
import { ensureSession } from "@/utils/supabase";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const pendingProductIdsRef = useRef(new Set());

  useEffect(() => {
    const init = async () => {
      await ensureSession();
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
    if (!user) {
      setFavorites([]);
      setError(null);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("favorites")
        .select("*, product:products(*, product_by_category(images))")
        .eq("user_id", user.id);

      if (error) {
        setError(error);
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
    const productId = product.id;
    setError(null);

    if (pendingProductIdsRef.current.has(productId)) return;
    pendingProductIdsRef.current.add(productId);
    try {
      const alreadyFavorited = isFavorite(productId);

      if (alreadyFavorited) {
        const removedFavorite = favorites.find(
          (item) => item.product_id === productId,
        );
        setFavorites((prev) =>
          prev.filter((item) => item.product_id !== productId),
        );

        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);

        if (error) {
          console.error("Failed to remove favorite:", error);
          setError(error);

          if (removedFavorite) {
            setFavorites((prev) =>
              prev.some((item) => item.product_id === productId)
                ? prev
                : [removedFavorite, ...prev],
            );
          }
        }
      } else {
        const optimisticEntry = {
          id: `temp-${productId}`,
          product_id: productId,
          product: {
            name: product.name,
            price: product.price,
            category: product.category,
            product_by_category: [{ images: product.images }],
          },
        };
        setFavorites((prev) => [optimisticEntry, ...prev]);

        const { data, error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, product_id: productId })
          .select("*, product:products(*, product_by_category(images))")
          .single();

        if (error) {
          console.error("Failed to add favorite:", error);
          setError(error);

          setFavorites((prev) =>
            prev.filter((item) => item.product_id !== productId),
          );
        } else {
          setFavorites((prev) =>
            prev.map((item) => (item.product_id === productId ? data : item)),
          );
        }
      }
    } finally {
      pendingProductIdsRef.current.delete(productId);
    }
  };

  const value = { favorites, isFavorite, toggleFavorite, loading, error };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };
