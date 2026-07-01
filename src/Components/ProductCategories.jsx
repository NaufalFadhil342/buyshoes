import { useContext, useEffect, useState } from "react";
import { getProductCategories } from "../Helpers/getProductCategories";
import ProductCategoryItem from "./ProductCategoryItem";
import useEmblaCarousel from "embla-carousel-react";
import { useArrowBtn } from "./ArrowBtn";
import { prevArrow, nextArrow } from "./Icons/draftIcon";
import { FavoriteContext } from "../context/FavoriteContext";

const ProductCategories = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("originals");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
  });
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);

  const { nextBtnDisabled, prevBtnDisabled, onNextBtnClick, onPrevBtnClick } =
    useArrowBtn(emblaApi);

  const currentItems =
    productCategories.find((cat) => cat.category === selectedCategory)?.items ??
    [];

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getProductCategories();
      setProductCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!emblaApi || productCategories.length === 0) return;
    emblaApi.reInit();
  }, [emblaApi, productCategories.length]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [emblaApi, selectedCategory]);

  const handleCategorySelect = (currentCategory) =>
    setSelectedCategory(currentCategory);

  const PrevArrowIcon = prevArrow;
  const NextArrowIcon = nextArrow;

  return (
    <section id="product-reference">
      <ul className="w-full h-auto flex items-center gap-4 px-[5%] sm:px-12 lg:px-20 overflow-x-auto scrollbar-none md:overflow-hidden">
        {productCategories.map((cat, index) => (
          <li
            key={index}
            className={`w-auto h-8 shrink-0 whitespace-nowrap ${selectedCategory === cat.category ? "border-accent bg-accent text-white" : "border-stone-700 bg-transparent text-stone-700"} px-3.5 border rounded-full text-sm flex items-center gap-2 hover:cursor-pointer`}
            aria-label={cat.category}
            onClick={() => handleCategorySelect(cat.category)}
          >
            <img
              className={`w-auto h-4 object-center`}
              src={cat.icon}
              alt={cat.name}
            />
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
      <div className="w-full h-auto mt-10 mb-20 relative">
        <ProductCategoryItem
          items={currentItems}
          emblaRef={emblaRef}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
        <button
          type="button"
          onClick={onPrevBtnClick}
          disabled={prevBtnDisabled}
          className={`absolute left-[7%] sm:left-12 lg:left-20 w-fit top-1/2 -mt-20 ${prevBtnDisabled ? "hidden" : "block"} bg-white border py-2 px-1 cursor-pointer`}
        >
          <PrevArrowIcon className="size-9 text-stone-700" />
        </button>
        <button
          type="button"
          onClick={onNextBtnClick}
          disabled={nextBtnDisabled}
          className={`absolute right-[7%] sm:right-12 lg:right-20 w-fit top-1/2 -mt-20 ${nextBtnDisabled ? "hidden" : "block"} bg-white border py-2 px-1 cursor-pointer`}
        >
          <NextArrowIcon className="size-9 text-stone-700" />
        </button>
      </div>
    </section>
  );
};

export default ProductCategories;
