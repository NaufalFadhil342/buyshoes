import { useContext } from "react";
import { FavoriteContext } from "@/context/FavoriteContext";
import {
  favorite as Favorite,
  favoriteOutline as FavoriteOutline,
} from "./Icons/draftIcon";
import { Link } from "react-router";

const Products = ({ product, item, selectedItem }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);

  return (
    <div key={product.id} className="w-full h-auto">
      <Link
        className="relative h-full w-full"
        to={`/${product.slug}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <button
          className="absolute z-3 top-4 right-4 hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(selectedItem);
          }}
        >
          {isFavorite(product.id) ? (
            <Favorite className="size-6 text-red-600" />
          ) : (
            <FavoriteOutline className="size-6 text-red-600" />
          )}
        </button>
        <span className="w-full h-100 block">
          <img
            className="w-full h-full object-cover object-center"
            src={item?.images?.[0]}
            alt={`${product.name} product image`}
            loading="lazy"
            width={500}
            height={500}
          />{" "}
        </span>
        <div className="w-full h-auto py-4 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-stone-900">
            ${product.price}
          </h3>
          <p>{product.name}</p>
          <p className="text-sm text-stone-400 capitalize">
            {product.category}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Products;
