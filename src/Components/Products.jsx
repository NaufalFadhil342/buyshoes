import ProductCard from "./ProductCard";

const Products = ({ product, item }) => {
  const merged = { ...product, images: item?.images ?? product?.images };

  return <ProductCard product={merged} />;
};

export default Products;
