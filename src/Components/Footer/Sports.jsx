import { sports_list } from "../../LocalData/footer-data";
import { Link } from "react-router";

const Sports = () => {
  return (
    <section className="w-auto h-auto">
      <p className="text-lg font-bold text-white">Sports</p>
      <ul className="flex flex-col gap-3 mt-3">
        {sports_list.map((sport, index) => (
          <li key={index} className="text-stone-200 hover:text-white">
            <Link to={sport.link}>{sport.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sports;
