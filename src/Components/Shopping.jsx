import { useContext, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useProducts } from "../hooks/useApi";
import { useArrowBtn } from "../Components/ArrowBtn";
import {
  prevArrow as PrevArrowIcon,
  nextArrow as NextArrowIcon,
  favorite as Favorite,
  favoriteOutline as FavoriteOutline,
  close as CloseIcon,
} from "../Components/Icons/draftIcon";
import ExpandIcon from "@iconify-react/fe/expand";
import { FavoriteContext } from "../context/FavoriteContext";

const Shopping = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    align: "center",
  });
  const { products, loading } = useProducts();
  const { nextBtnDisabled, prevBtnDisabled, onNextBtnClick, onPrevBtnClick } =
    useArrowBtn(emblaApi);
  const [showItems, setShowItems] = useState(null);
  const expandItemRef = useRef(null);
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);

  const handleShowItems = (currentId) => {
    setShowItems((prev) => (prev === currentId ? null : currentId));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (expandItemRef.current && !expandItemRef.current.contains(e.target)) {
        setShowItems(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section id="shopping">
      <div className="w-full px-[5%] sm:px-12 lg:px-20">
        <h2 className="text-2xl sm:text-[2em] font-bold text-stone-900 uppercase">
          Shop The Look
        </h2>
      </div>
      <div className="overflow-hidden mt-10 relative" ref={emblaRef}>
        <div
          className="flex gap-4 mx-[5%] sm:mx-12 lg:mx-20"
          ref={expandItemRef}
        >
          {products.slice(0, 6).map((prd) => {
            const item = prd.product_by_category?.[0];
            return (
              <div
                key={prd.id}
                className="flex-[0_0_95%] xs:flex-[0_0_80%] sm:flex-[0_0_65%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_33%] h-screen overflow-hidden relative"
              >
                <img
                  className="w-full h-full object-cover object-center"
                  src={item.images[0]}
                  alt={prd.name}
                  width={600}
                  height={600}
                  loading="lazy"
                />
                <button
                  className="absolute bottom-6 left-4 bg-white px-4 py-2 w-fit flex items-center gap-3 z-10 hover:cursor-pointer"
                  onClick={() => handleShowItems(prd.id)}
                >
                  <p>
                    {prd.product_by_category?.length}{" "}
                    {prd.product_by_category?.length > 1 ? "Items" : "Item"}
                  </p>
                  <span className="flex border">
                    {showItems === prd.id ? (
                      <CloseIcon className="size-5" />
                    ) : (
                      <ExpandIcon className="size-5" />
                    )}
                  </span>
                </button>
                {showItems === prd.id && (
                  <div className="absolute top-0 left-0 w-full h-full bg-stone-900/50 flex flex-col gap-1">
                    {prd.product_by_category?.map((item) => {
                      const selectedItem = {
                        id: prd.id,
                        name: prd.name,
                        price: prd.price,
                        images: item.images,
                        category: prd.category,
                      };

                      return (
                        <div
                          key={item.id}
                          className="absolute z-10 bottom-20 left-4 bg-white w-full max-w-[90%] h-auto flex"
                        >
                          <span className="block w-26 h-20 overflow-hidden">
                            <img
                              className="w-full h-full object-cover object-center"
                              src={item.images[0]}
                              alt={prd.name}
                              loading="lazy"
                              width={400}
                              height={400}
                            />
                          </span>
                          <div className="flex flex-col justify-center px-4 w-full h-auto">
                            <div className="font-bold text-stone-900">
                              ${prd.price}
                            </div>
                            <p>{prd.name}</p>
                          </div>
                          <button
                            className="absolute z-3 top-4 right-4 hover:cursor-pointer"
                            onClick={() => toggleFavorite(selectedItem)}
                          >
                            {isFavorite(prd.id) ? (
                              <Favorite className="size-5 text-red-600" />
                            ) : (
                              <FavoriteOutline className="size-5 text-red-600" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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

export default Shopping;
