import { support_center } from "../../LocalData/footer-data";
import { Link } from "react-router";

const SupportCenter = () => {
  return (
    <div className="w-auto h-auto">
      <p className="text-lg font-bold text-white">Support Center</p>
      <ul className="flex flex-col gap-3 mt-3">
        {support_center.map((support, index) => (
          <li key={index} className="text-stone-200 hover:text-white">
            <Link to={support.link}>{support.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportCenter;
