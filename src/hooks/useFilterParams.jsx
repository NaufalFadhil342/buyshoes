import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function useFilterParams(state, dispatch) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sizes = searchParams.get("sizes")?.split(",").filter(Boolean) || [];
    const categories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const genders =
      searchParams.get("genders")?.split(",").filter(Boolean) || [];
    const brands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
    const sort = searchParams.get("sort") || null;

    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 0;

    const payload = {
      sizes,
      categories,
      genders,
      brands,
      sort,
      priceRange: [minPrice, maxPrice],
    };

    dispatch({ type: "HYDRATE_FROM_URL", payload: payload });
  }, []);

  useEffect(() => {
    const params = {};
    if (state.sizes.length) params.sizes = state.sizes.join(",");
    if (state.categories.length) params.categories = state.categories.join(",");
    if (state.genders.length) params.genders = state.genders.join(",");
    if (state.brands.length) params.brands = state.brands.join(",");
    if (state.sort) params.sort = state.sort;

    const [min, max] = state.priceRange;
    if (min) params.minPrice = min;
    if (max) params.maxPrice = max;

    setSearchParams(params, { replace: true });
  }, [state]);

  return { searchParams, setSearchParams };
}
