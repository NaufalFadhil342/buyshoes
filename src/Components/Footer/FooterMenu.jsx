import CompanyInfo from "./CompanyInfo";
import FollowUs from "./FollowUs";
import ProductsList from "./ProductsList";
import Sports from "./Sports";
import SupportCenter from "./SupportCenter";

const FooterMenu = () => {
  return (
    <section className="w-full h-auto flex flex-col gap-6 py-10 px-[5%] sm:px-12 lg:px-20">
      <div className="text-[2em] font-bold text-white flex items-center lg:justify-center">
        <>buy</>
        <span className="flex underline text-accent">Shoes</span>
      </div>
      <div className="w-auto h-auto flex flex-wrap lg:justify-center gap-6 sm:gap-12">
        <ProductsList />
        <Sports />
        <CompanyInfo />
        <SupportCenter />
        <FollowUs />
      </div>
    </section>
  );
};

export default FooterMenu;
