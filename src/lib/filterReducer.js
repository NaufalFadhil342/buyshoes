export const initialFilterState = {
  sort: null,
  sizes: [],
  genders: [],
  categories: [],
  brands: [],
  priceRange: [0, 0],
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_SORT":
      return { ...state, sort: action.payload };

    case "TOGGLE_VALUE": {
      const { key, value } = action.payload;
      const current = state[key];
      const exists = current.includes(value);
      return {
        ...state,
        [key]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    }

    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    case "RESET":
      return initialFilterState;

    default:
      return state;
  }
};

export const countActiveFilters = (state) => {
  return (
    (state.sort ? 1 : 0) +
    state.sizes.length +
    state.genders.length +
    state.categories.length +
    state.brands.length +
    (state.priceRange[0] || state.priceRange[1] ? 1 : 0)
  );
};
