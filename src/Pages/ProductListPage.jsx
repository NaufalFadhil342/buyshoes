import { useMemo, useReducer, useState } from "react";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";
import { SkeletonCard } from "@/Components/ui/SkeletonCard";
import { sortFiltersIcon as SortFiltersIcon } from "@/Components/Icons/draftIcon";
import Products from "@/Components/Products";
import SortFilters from "@/Components/SortFilters";
import {
  initialFilterState,
  filterReducer,
  countActiveFilters,
} from "@/lib/filterReducer";
import { applyFilters } from "@/lib/applyFilters";
import { useFilterParams } from "@/hooks/useFilterParams";
import { buildActiveFilterLabels } from "@/lib/filterLabels";

const ProductListPage = ({ gender = null, title }) => {
  const { products, loading, error } = useCategoryProducts(gender);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  useFilterParams(filters, dispatch);

  const filteredProducts = useMemo(
    () => applyFilters(products, filters),
    [products, filters],
  );

  const activeFilterCount = countActiveFilters(filters);

  const activeLabels = useMemo(
    () => buildActiveFilterLabels(filters, products ?? []),
    [filters, products],
  );

  if (loading) return <SkeletonCard />;
  if (error || !products)
    return (
      <p className="text-stone-500 text-xl">{error || "Products not found"}</p>
    );

  return (
    <section id={title.toLowerCase()}>
      <div className="w-full h-auto mb-12">
        <h2 className="text-4xl font-bold text-stone-900">{title}</h2>
        <div className="flex items-center justify-between w-full mt-12">
          <span className="text-primary">
            {filteredProducts.length} results
          </span>
          <button
            className="w-auto h-14 flex items-center gap-3 px-4 bg-transparent sm:border sm:border-primary hover:cursor-pointer"
            onClick={() => setOpenFilter(true)}
          >
            <p className="text-stone-900 font-semibold hidden sm:block">
              Sort & Filters
            </p>
            <div className="w-auto h-auto relative">
              <SortFiltersIcon className="size-6 text-stone-500" />
              <span className="size-4.25 text-xs bg-accent text-white flex items-center justify-center absolute -top-2 -right-2 pl-px">
                {activeFilterCount}
              </span>
            </div>
          </button>
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center w-full">
          <p className="text-stone-500 text-2xl font-bold">
            No items match{" "}
            {activeLabels.length > 0
              ? activeLabels.map((l) => l.text).join(", ")
              : "the selected filters"}
          </p>
          {activeLabels.length > 0 && (
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="mt-3 text-sm underline text-stone-600"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="w-full h-auto grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {filteredProducts.map((prd) => {
            const item = prd.product_by_category?.[0];
            const selectedItem = {
              id: prd.id,
              name: prd.name,
              price: prd.price,
              images: item?.images,
              category: prd.category,
            };

            return (
              <Products
                key={prd.id}
                product={prd}
                item={item}
                selectedItem={selectedItem}
              />
            );
          })}
        </div>
      )}
      {openFilter && (
        <SortFilters
          onHideFilter={() => setOpenFilter(false)}
          filterCount={activeFilterCount}
          dispatch={dispatch}
          filters={filters}
        />
      )}
    </section>
  );
};

export default ProductListPage;
