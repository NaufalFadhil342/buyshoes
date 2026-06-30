import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProductDetail } from "../../hooks/useApi";
import { FavoriteContext } from "../../context/FavoriteContext";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import AccordionItem from "./AccordionItem";
import Description from "./Description";
import Detail from "./Detail";

const selectSizes = [
  {
    size: 35,
    text: "35 EUR",
  },
  {
    size: 36,
    text: "36 EUR",
  },
  {
    size: 37,
    text: "37 EUR",
  },
  {
    size: 38,
    text: "38 EUR",
  },
  {
    size: 39,
    text: "39 EUR",
  },
  {
    size: 40,
    text: "40 EUR",
  },
  {
    size: 41,
    text: "41 EUR",
  },
  {
    size: 42,
    text: "42 EUR",
  },
  {
    size: 43,
    text: "43 EUR",
  },
  {
    size: 44,
    text: "44 EUR",
  },
  {
    size: 45,
    text: "45 EUR",
  },
];

const ProductDetail = () => {
  const { slug } = useParams();
  const { product, loading, error } = useProductDetail(slug);
  const { isFavorite, toggleFavorite } = useContext(FavoriteContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isaAccordionOpen, setIsAccordionOpen] = useState(null);

  const handleAccordionActive = (active) => {
    setIsAccordionOpen((prev) => (prev === active ? null : active));
  };

  const images = product?.product_by_category?.[0]?.images ?? [];

  useEffect(() => {
    if (images.length) {
      setSelectedImage(images[0]);
    }
  }, [product]);

  if (loading) return <div className="product-detail">Loading...</div>;
  if (error || !product)
    return (
      <p id="product-detail" className="text-xl font-bold">
        Product Not Found
      </p>
    );

  const favoriteItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
  };

  return (
    <section id="product-detail">
      <div className="lg:flex-[0_0_65%]">
        <ProductGallery
          images={images}
          onSelect={setSelectedImage}
          productName={product.name}
          selectedImage={selectedImage}
        />

        <div className="px-[5%] sm:px-12 lg:px-0 lg:pl-20 mt-12 lg:mt-20">
          <AccordionItem
            title="Reviews"
            isOpen={isaAccordionOpen}
            onToggle={() => handleAccordionActive("Reviews")}
          ></AccordionItem>
          <AccordionItem
            title="Description"
            isOpen={isaAccordionOpen}
            onToggle={() => handleAccordionActive("Description")}
          >
            <Description
              product={product}
              selectedImage={selectedImage}
              productName={product.name}
            />
          </AccordionItem>
          <AccordionItem
            title="Details"
            isOpen={isaAccordionOpen}
            onToggle={() => handleAccordionActive("Details")}
          >
            <Detail product={product} />
          </AccordionItem>
        </div>
      </div>
      <div className="lg:flex-[0_0_35%] flex">
        <ProductInfo
          favoriteItem={favoriteItem}
          isFavorite={isFavorite}
          product={product}
          selectSizes={selectSizes}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </section>
  );
};

export default ProductDetail;
