import { website_legals } from "../../LocalData/footer-data";
import { Link } from "react-router";

const FooterLegalLinks = () => {
  return (
    <section className="w-full h-auto border-t border-stone-500 px-[5%] sm:px-12 lg:px-20">
      <ul className="w-full h-auto flex flex-wrap justify-center gap-6 py-4">
        {website_legals.map((legal, index) => (
          <li key={index} className="text-white">
            <Link to={legal.url}>{legal.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterLegalLinks;
