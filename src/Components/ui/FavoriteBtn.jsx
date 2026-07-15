import { FavoriteContext } from "@/context/FavoriteContext";
import { useContext } from "react";
import {
  favorite as Favorite,
  favoriteOutline as FavoriteOutline,
} from "@/Components/Icons/draftIcon";

const FavoriteBtn = ({ product, images, className = "" }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);
  const active = isFavorite(product.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      images: images ?? product.images,
      category: product.category,
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={active ? "Hapus dari favorit" : "Tambah ke favorit"}
      aria-pressed={active}
      className={`hover:cursor-pointer ${className}`}
    >
      {active ? (
        <Favorite className="size-6 text-red-600" />
      ) : (
        <FavoriteOutline className="size-6 text-red-600" />
      )}
    </button>
  );
};

export default FavoriteBtn;
