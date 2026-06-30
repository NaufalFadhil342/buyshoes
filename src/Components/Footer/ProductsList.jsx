import { products_list } from "../../LocalData/footer-data";
import { Link } from "react-router";

const ProductsList = () => {
  return (
    <section className="w-auto h-auto">
      <p className="text-lg font-bold text-white">Products List</p>
      <ul className="w-auto h-auto flex flex-col gap-3 mt-3">
        {products_list.map((prod, index) => (
          <li key={index} className="text-stone-200 hover:text-white">
            <Link to={prod.link}>{prod.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductsList;
