import { useProducts } from "../hooks/useApi";
import ProductCard from "./ProductCard";
import { Loading } from "./ui/Loading";

const ProductInterested = () => {
  const { products, loading } = useProducts();

  if (loading) return <Loading />;

  return (
    <section id="product-interested">
      <div className="w-full h-auto px-[5%] sm:px-12 lg:px-20">
        <h2 className="text-2xl sm:text-[2em] font-bold text-stone-900 uppercase">
          Still Interested?
        </h2>
      </div>
      <div className="w-full h-auto">
        <ul className="h-auto flex gap-4 pt-10 pb-5 scrollbar-none scrollbar-thumb-stone-300 pl-[5%] sm:pl-12 lg:pl-20 overflow-x-auto">
          {products.slice(10, 16).map((prd) => {
            const item = prd.product_by_category?.[0];
            const product = {
              id: prd.id,
              slug: prd.slug,
              name: prd.name,
              price: prd.price,
              category: prd.category,
              images: item?.images,
            };

            return (
              <li key={prd.id} className="flex-none w-72 h-auto">
                <ProductCard product={product} />
              </li>
            );
          })}

          <li
            className="flex-none w-[2.5%] sm:w-8 lg:w-16"
            aria-hidden="true"
          />
        </ul>
      </div>
    </section>
  );
};

export default ProductInterested;
