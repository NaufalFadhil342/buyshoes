import { ratingIcon as RatingIcon } from "../Icons/draftIcon";
import InfoIcon from "@iconify-react/material-symbols/info-outline";
import DeliveryTimeIcon from "@iconify-react/carbon/delivery-time";

const ProductInfo = ({
  product,
  selectSizes,
  toggleFavorite,
  isFavorite,
  favoriteItem,
}) => {
  return (
    <div className="w-full xl:sticky self-start top-0 px-[5%] sm:px-12 lg:pl-10 lg:pr-20 pt-12 flex flex-col gap-4">
      <span className="block capitalize">{product.category}</span>
      <div className="w-full flex items-center justify-between gap-4 mt-4">
        <h3 className="text-xl font-semibold text-stone-900">{product.name}</h3>
        <div className="flex items-center gap-1">
          <RatingIcon className="size-3 text-yellow-500" />
          <span className="block text-sm">5.0</span>
        </div>
      </div>
      <p className="-mt-2">${product.price}</p>
      <p className="my-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        fugit molestias voluptate odio magnam atque inventore perspiciatis quae.
      </p>
      <div>
        <p className="font-semibold text-stone-900">Select Size</p>
        <ul className="flex items-center flex-wrap gap-3 mt-4">
          {selectSizes.map((size, index) => {
            return (
              <li
                key={index}
                className="w-auto h-8 flex items-center px-3 rounded bg-stone-200 hover:bg-accent hover:cursor-pointer hover:text-white text-sm"
              >
                {size.text}
              </li>
            );
          })}
        </ul>
        <div className="w-fit lg:w-full p-4 border flex items-start gap-2 mt-6">
          <InfoIcon className="size-6 text-stone-500" />
          <p className="text-stone-500">
            <span className="font-semibold text-stone-900">True to size.</span>{" "}
            We recommend ordering your usual size.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-stone-900 font-semibold">Quantity</p>
        <ul className="flex mt-4">
          <button className="w-auto h-8 px-3 border border-stone-300 flex items-center text-lg hover:cursor-pointer">
            -
          </button>
          <div className="w-auto h-8 px-3 border-y border-stone-300 flex items-center text-sm">
            01
          </div>
          <button className="w-auto h-8 px-3 border border-stone-300 flex items-center text-lg hover:cursor-pointer">
            +
          </button>
        </ul>
      </div>
      <div className="w-full h-auto flex lg:flex-col xl:flex-row items-center gap-4 mt-6">
        <button className="w-full h-14 flex items-center justify-center text-white bg-stone-900 hover:bg-stone-800 hover:cursor-pointer">
          Add to Bag
        </button>
        <button
          className="w-full h-14 flex items-center justify-center border  hover:cursor-pointer"
          onClick={() => toggleFavorite(favoriteItem)}
        >
          {isFavorite(product.id) ? "Favorited" : "Add to Favorite"}
        </button>
      </div>
      <div className="w-full h-auto my-4">
        <p className="text-stone-500 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ad quam
          quis.
        </p>
      </div>
      <div className="w-full h-auto flex items-center gap-2">
        <DeliveryTimeIcon className="size-5 text-stone-500" />
        <button className="text-sm font-semibold text-stone-900 hover:cursor-pointer underline">
          Get Delivery Time
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
