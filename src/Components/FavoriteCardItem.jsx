import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { favorite as FavoriteIcon } from "../Components/Icons/draftIcon";
import { Link } from "react-router";

const FavoriteCardItem = () => {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const limitFavorites = favorites.slice(0, 3);

  return (
    <ul className="w-full h-auto flex flex-col gap-4">
      {limitFavorites.map((item) => (
        <li key={item.id} className="w-full h-auto flex relative">
          <span className="block w-34 h-20 overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={item.images[0]}
              alt={item.name}
            />
          </span>
          <div className="w-full h-auto pl-4">
            <p className="font-semibold text-stone-900">{item.name}</p>
            <span>${item.price}</span>
            <p className="text-sm italic text-stone-400 capitalize">
              {item.category}
            </p>
          </div>
          <button
            onClick={() => toggleFavorite(item)}
            className="absolute top-0 right-0 hover:cursor-pointer"
          >
            <FavoriteIcon className="text-red-600 size-5" />
          </button>
        </li>
      ))}
      {favorites.length >= 3 && (
        <Link
          to="/favorites"
          className="w-auto h-12 bg-accent hover:bg-accent-dark text-white flex items-center justify-center transition-colors duration-150 ease-in-out"
        >
          View All Items
        </Link>
      )}
    </ul>
  );
};

export default FavoriteCardItem;
