import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";

export const useImages = () => {
  const [getImages, setGetImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data: files } = await supabase.storage
        .from("shoes")
        .list("promotion");

      const imagesWithUrls = files.map((file) => {
        const { data } = supabase.storage
          .from("shoes")
          .getPublicUrl(`promotion/${file.name}`);
        return {
          ...file,
          publicUrl: data.publicUrl,
        };
      });

      setGetImages(imagesWithUrls);
      setLoading(false);
    };

    fetchImages();
  }, []);

  return { getImages, loading };
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("products")
          .select(
            `*, product_by_category(images, gender, id), product_meta(*), brand:brands(*), sizes:product_sizes(*)`,
          );

        if (error) throw error;

        setProducts(data ?? []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export const useProductDetail = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("products")
          .select(`*, product_by_category(images, gender, id), product_meta(*)`)
          .eq("slug", slug)
          .single();

        if (error) {
          setError(error);
          setProduct(null);
          return;
        }

        setProduct(data ?? null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
};

export const useFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("favorites")
          .select(
            "*, products:products(name, slug, price, detail, category, product_images:product_by_category(images))",
          );

        if (error) throw error;

        setFavorites(data ?? []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return { favorites, loading, error, setFavorites, setError };
};
