import ProductCard from "./ProductCard";

const ProductCategoryItem = ({ items, emblaRef }) => {
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4 mx-[5%] sm:mx-12 lg:mx-20">
        {items.map((item) => {
          const product = {
            id: item.product_id,
            slug: item.products?.slug,
            name: item.products?.name,
            price: item.products?.price,
            images: item.images,
            category: items.products?.category,
          };

          return (
            <div
              key={item.id}
              className="flex-[0_0_80%] xs:flex-[0_0_60%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_20%] border border-background hover:border-stone-700"
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategoryItem;
