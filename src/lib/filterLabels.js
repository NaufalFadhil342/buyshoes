export function buildActiveFilterLabels(filters, products) {
  const labels = [];

  filters.brands.forEach((slug) => {
    const match = products.find((p) => p.brand?.slug === slug);
    labels.push({
      key: `brand-${slug}`,
      text: match?.brand?.name ?? slug,
      type: "brands",
      value: slug,
    });
  });

  filters.sizes.forEach((size) => {
    labels.push({
      key: `size-${size}`,
      text: `Size ${size}`,
      type: "sizes",
      value: size,
    });
  });

  filters.genders.forEach((g) => {
    labels.push({
      key: `gender-${g}`,
      text: g === "men" ? "Men" : g === "women" ? "Women" : g,
      type: "genders",
      value: g,
    });
  });

  filters.categories.forEach((c) => {
    labels.push({
      key: `category-${c}`,
      text: c.charAt(0).toUpperCase() + c.slice(1),
      type: "categories",
      value: c,
    });
  });

  const [min, max] = filters.priceRange;
  if (min || max) {
    labels.push({
      key: "priceRange",
      text: `Rp${min.toLocaleString("id-ID")} - Rp${max ? max.toLocaleString("id-ID") : "∞"}`,
      filterKey: "priceRange",
      value: null,
    });
  }

  return labels;
}
