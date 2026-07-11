export const applyFilters = (products, filters) => {
  let result = [...products];

  if (filters.genders.length) {
    result = result.filter((p) =>
      p.product_by_category?.some((cat) =>
        filters.genders.includes(cat.gender),
      ),
    );
  }

  if (filters.sizes.length) {
    result = result.filter((p) =>
      p.sizes?.some((s) => filters.sizes.includes(s.size)),
    );
  }

  if (filters.categories.length) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.brands.length) {
    result = result.filter((p) => filters.brands.includes(p.brand?.slug));
  }

  if (filters.priceRange[0] || filters.priceRange[1]) {
    const [min, max] = filters.priceRange;
    result = result.filter(
      (p) => p.price >= min && (max ? p.price <= max : true),
    );
  }

  if (filters.sort === "low") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "high") result.sort((a, b) => b.price - a.price);
  if (filters.sort === "new")
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return result;
};
