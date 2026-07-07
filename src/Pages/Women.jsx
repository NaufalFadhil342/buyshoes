import { useProducts } from "@/hooks/useApi";
import { SkeletonCard } from "@/Components/ui/SkeletonCard";
import { sortFiltersIcon as SortFiltersIcon } from "@/Components/Icons/draftIcon";
import Products from "@/Components/Products";

const Women = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <SkeletonCard />;
  if (error || !products)
    return (
      <p className="text-stone-500 text-xl">{error || "Products not found"}</p>
    );

  return (
    <section id="shoes">
      <div className="w-full h-auto mb-12">
        <h2 className="text-4xl font-bold text-stone-900">Women</h2>
        <div className="flex items-center justify-between w-full mt-12">
          <span className="text-primary">{products.length} results</span>
          <button className="w-auto h-14 flex items-center gap-3 px-4 bg-transparent sm:border sm:border-primary hover:cursor-pointer">
            <p className="text-stone-900 font-semibold hidden sm:block">
              Sort & Filters
            </p>
            <div className="w-auto h-auto relative">
              <SortFiltersIcon className="size-6 text-stone-500" />
              <span className="size-4.25 text-xs bg-accent text-white flex items-center justify-center absolute -top-2 -right-2 pl-px">
                0
              </span>
            </div>
          </button>
        </div>
      </div>
      <div className="w-full h-auto grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {products.map((prd) => {
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
    </section>
  );
};

export default Women;
