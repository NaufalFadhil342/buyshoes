import { our_media_social as media_social } from "../../LocalData/footer-data";
import { Link } from "react-router";

const FollowUs = () => {
  return (
    <section className="w-auto h-auto">
      <p className="text-white text-lg font-bold">Follow Us</p>
      <ul className="flex gap-4 mt-3">
        {media_social.map((media, index) => {
          const Icon = media.icon;

          return (
            <li key={index} className="text-stone-200 hover:text-white">
              <Link to={media.url}>
                <Icon className="text-white size-8" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FollowUs;
