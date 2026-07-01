import { useProducts } from "../hooks/useApi";
import {
  favorite as Favorite,
  favoriteOutline as FavoriteOutline,
} from "../Components/Icons/draftIcon";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { FavoriteContext } from "../context/FavoriteContext";
import { Loading } from "./ui/Loading";

const ProductInterested = () => {
  const { products, loading } = useProducts();
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);
  const navigate = useNavigate();

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
            const selectedItem = {
              id: prd.id,
              name: prd.name,
              price: prd.price,
              images: item?.images,
              category: prd.category,
            };

            return (
              <li
                key={prd.id}
                className="flex-none w-72 h-auto hover:cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/${prd.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(`/${prd.slug}`);
                }}
              >                onClick={() => navigate(`/${prd.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate(`/${prd.slug}`);
                }}
              >
                <div className="w-full h-100 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={item.images[0]}
                    alt={prd.id}
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                  <button
                    className="absolute z-3 top-4 right-4 hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedItem);
                    }}
                  >
                    {isFavorite(prd.id) ? (
                      <Favorite className="size-6 text-red-600" />
                    ) : (
                      <FavoriteOutline className="size-6 text-red-600" />
                    )}
                  </button>
                </div>
                <div className="w-full h-auto py-4 flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-stone-900">
                    ${prd.price}
                  </h3>
                  <p>{prd.name}</p>
                  <i className="text-sm text-stone-400 capitalize">
                    {prd.category}
                  </i>
                </div>
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
