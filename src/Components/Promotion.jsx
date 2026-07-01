import { useEffect, useState } from "react";
import { useImages } from "../hooks/useApi";
import { arrowRightThin as ArrowRightIcon } from "./Icons/draftIcon";
import { Loading } from "./ui/Loading";

const Promotion = () => {
  const { getImages, loading } = useImages();
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    if (!getImages?.length) return;

    const updateImages = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleImages(getImages.slice(0, 1));
      } else if (width < 1024) {
        setVisibleImages(getImages.slice(0, 2));
      } else {
        setVisibleImages(getImages.slice(0, 3));
      }
    };

    updateImages();
    window.addEventListener("resize", updateImages);
    return () => window.removeEventListener("resize", updateImages);
  }, [getImages]);

  if (loading) return <Loading />;

  return (
    <section id="promotion">
      <div className="w-full h-auto flex">
        {visibleImages.map((img) => {
          const cleanName = img.name?.replace(/\.[^/.]+$/, "");

          return (
            <div
              className="w-full h-[85vh] overflow-hidden shrink"
              key={img.id}
            >
              <img
                className="w-full h-full object-cover object-center"
                src={img.publicUrl}
                alt={cleanName}
                width={600}
                height={600}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      <div className="w-full h-full absolute left-0 top-0 px-[5%] sm:px-12 lg:px-20 flex flex-col gap-6 items-start justify-center">
        <h3 className="text-2xl bg-white font-semibold uppercase text-stone-900 px-2">
          Walk Your World
        </h3>
        <p className="bg-white px-2 -mt-3">
          Built for those who move with purpose.
        </p>
        <button className="bg-white w-auto px-4 h-12 sm:h-14 flex items-center gap-3 font-medium sm:text-lg hover:bg-accent hover:text-white hover:cursor-pointer transition-colors duration-150 ease-in-out">
          <>Explore Now</>
          <ArrowRightIcon className="size-6 sm:size-8" />
        </button>
      </div>
    </section>
  );
};

export default Promotion;
