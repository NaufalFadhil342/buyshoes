const Description = ({ product, selectedImage, productName }) => {
  const productMeta = product?.product_meta;

  const paragraphs = productMeta.meta_description
    ?.split("\n")
    .filter((p) => p.trim() !== "");

  return (
    <div className="w-full h-auto flex items-center gap-8 lg:pr-12">
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-stone-900 uppercase">
          {productMeta.meta_title}
        </h3>
        <div className="space-y-6 mt-2">
          {paragraphs?.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
      <div className="w-full h-80 hidden sm:block">
        <img
          className="w-full h-full object-cover object-center"
          src={selectedImage}
          alt={productName}
          width={500}
          height={500}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Description;
