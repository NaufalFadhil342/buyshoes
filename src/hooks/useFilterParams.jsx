import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const buildPayloadFromSearchParams = (searchParams) => {
  const sizes = searchParams.get("sizes")?.split(",").filter(Boolean) || [];
  const categories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const genders = searchParams.get("genders")?.split(",").filter(Boolean) || [];
  const brands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const sort = searchParams.get("sort") || null;

  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 0;

  return {
    sizes,
    categories,
    genders,
    brands,
    sort,
    priceRange: [minPrice, maxPrice],
  };
};

const isPayloadEqual = (payload, state) => {
  const [minPrice, maxPrice] = state.priceRange;

  return (
    payload.sizes.join(",") === state.sizes.join(",") &&
    payload.categories.join(",") === state.categories.join(",") &&
    payload.genders.join(",") === state.genders.join(",") &&
    payload.brands.join(",") === state.brands.join(",") &&
    payload.sort === state.sort &&
    payload.priceRange[0] === minPrice &&
    payload.priceRange[1] === maxPrice
  );
};

export function useFilterParams(state, dispatch) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const payload = buildPayloadFromSearchParams(searchParams);

    if (!isPayloadEqual(payload, state)) {
      dispatch({ type: "HYDRATE_FROM_URL", payload });
    }

    setHasHydrated(true);
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!hasHydrated) return;

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
  }, [hasHydrated, setSearchParams, state]);

  return { searchParams, setSearchParams };
}
