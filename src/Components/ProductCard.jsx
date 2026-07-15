import { Link } from "react-router";
import FavoriteBtn from "./ui/FavoriteBtn";

const ProductCard = ({ product, className = "" }) => {
  const thumbnail = product?.images?.[0];

  return (
    <div className={`relative w-full h-auto group ${className}`}>
      <Link
        to={`/${product?.slug}`}
        onClick={() => window.scrollTo({ top: 0 })}
        className="absolute inset-0 z-0"
        aria-label={`Lihat detail ${product?.name}`}
      />

      <div className="w-full h-80 overflow-hidden relative pointer-events-none">
        <img
          className="w-full h-full object-cover object-center"
          src={thumbnail}
          alt={`${product?.name} product image`}
          loading="lazy"
          width={500}
          height={500}
        />
      </div>

      <FavoriteBtn
        product={product}
        images={product?.images}
        className="absolute z-10 top-4 right-4"
      />

      <div className="w-full h-auto flex flex-col py-6 gap-2 pointer-events-none">
        <h3 className="text-xl font-semibold text-primary">
          ${product?.price}
        </h3>
        <p>{product?.name}</p>
        <i className="text-sm text-stone-400 capitalize">{product?.category}</i>
      </div>
    </div>
  );
};

export default ProductCard;
