import { company_info } from "../../LocalData/footer-data";
import { Link } from "react-router";

const CompanyInfo = () => {
  return (
    <section className="w-auto h-auto">
      <p className="text-lg font-bold text-white">Company Info</p>
      <ul className="flex flex-col gap-3 mt-3">
        {company_info.map((comp, index) => (
          <li key={index} className="text-stone-200 hover:text-white">
            <Link to={comp.link}>{comp.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CompanyInfo;
