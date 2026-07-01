import { useNavigate } from "react-router";
import {
  favorite as FavoriteIcon,
  favoriteOutline as FavoriteOutlineIcon,
} from "./Icons/draftIcon";

const ProductCategoryItem = ({
  items,
  emblaRef,
  isFavorite,
  toggleFavorite,
}) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4 mx-[5%] sm:mx-12 lg:mx-20">
        {items.map((item) => {
          const product = item?.products;
          const selectedItem = {
            id: item.product_id,
            name: product?.name,
            price: product?.price,
            image: item.images,
            category: product?.category,
          };

          return (
            <div
              key={item.id}
              className={`flex-[0_0_80%] xs:flex-[0_0_60%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_20%] h-auto border border-background hover:border-stone-700
                 hover:cursor-pointer`}
              onClick={() => navigate(`/${product.slug}`)}
            >
              <div className="w-full h-80 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover object-center"
                  src={item.images[0]}
                  alt={product?.name}
                  loading="lazy"
                  width={600}
                  height={600}
                />
                <button
                  className="absolute z-3 top-4 right-4 hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedItem);
                  }}
                >
                  {isFavorite(item.product_id) ? (
                    <FavoriteIcon className="size-6 text-red-600" />
                  ) : (
                    <FavoriteOutlineIcon className="size-6 text-red-600" />
                  )}
                </button>
              </div>
              <div className="w-full h-auto flex flex-col py-6 gap-2">
                <h3 className="text-xl font-semibold text-primary">
                  ${product?.price}
                </h3>
                <p>{product?.name}</p>
                <i className="text-sm text-stone-400 capitalize">
                  {product?.category}
                </i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategoryItem;
