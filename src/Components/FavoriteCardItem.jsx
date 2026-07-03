import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { favorite as FavoriteIcon } from "../Components/Icons/draftIcon";
import { Link } from "react-router";

const FavoriteCardItem = () => {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const limitFavorites = favorites.slice(0, 3);

  return (
    <ul className="w-full h-auto flex flex-col gap-4">
      {limitFavorites.map((item) => {
        const prd = item?.product;
        const images = prd?.product_by_category?.[0]?.images;
        const favoriteItem = {
          id: item.product_id,
          name: prd?.name,
          price: prd?.price,
          category: prd?.category,
          images: images,
        };

        return (
          <li key={item.id} className="w-full h-auto flex relative">
            <span className="block w-34 h-20 overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={images?.[0]}
                alt={
                  prd?.name
                    ? `${prd.name} product image`
                    : "Favorite product image"
                }
                loading="lazy"
                width={400}
                height={400}
              />
            </span>
            <div className="w-full h-auto pl-4">
              <p className="font-semibold text-stone-900">{prd?.name}</p>
              <span>${prd?.price}</span>
              <p className="text-sm italic text-stone-400 capitalize">
                {prd?.category}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(favoriteItem)}
              className="absolute top-0 right-0 hover:cursor-pointer"
            >
              <FavoriteIcon className="text-red-600 size-5" />
            </button>
          </li>
        );
      })}
      <Link
        to="/favorites"
        className="w-auto h-12 bg-accent hover:bg-accent-dark text-white flex items-center justify-center transition-colors duration-150 ease-in-out"
      >
        {favorites.length > 1 ? "View All Items" : "View Item"}
      </Link>
    </ul>
  );
};

export default FavoriteCardItem;
