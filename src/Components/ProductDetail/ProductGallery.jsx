const ProductGallery = ({ images, selectedImage, onSelect, productName }) => {
  return (
    <div className="flex flex-col-reverse xl:flex-row w-full">
      <ul className="w-auto xl:w-full overflow-x-auto scrollbar-none lg:overflow-visible xl:max-w-56 shrink-0 mt-5 px-[5%] sm:px-12 lg:px-0 lg:pl-20 xl:pr-5 xl:mt-0 flex flex-row xl:flex-col gap-5">
        {images.map((src, index) => {
          return (
            <li
              key={index}
              className={`flex-[0_0_40%] sm:flex-1 h-28 overflow-hidden ${selectedImage === src ? "border border-primary" : "border-transparent"}`}
              onClick={() => onSelect(src)}
            >
              <img
                className="w-full h-full object-cover object-center"
                src={src}
                alt={`${productName} ${index + 1}`}
                width={400}
                height={400}
              />
            </li>
          );
        })}
      </ul>
      <div className="w-full h-screen lg:h-auto px-[5%] sm:px-12 lg:px-0 lg:pl-20 xl:pl-0 md:aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={selectedImage}
          alt={productName}
          loading="lazy"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
