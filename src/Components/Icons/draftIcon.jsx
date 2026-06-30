import ShopBagIcon from "@iconify-react/mdi/shopping";
import FavoriteIcon from "@iconify-react/material-symbols/favorite";
import FavoriteOutlineIcon from "@iconify-react/material-symbols/favorite-outline";
import AccountIcon from "@iconify-react/mdi/account";
import PrevArrowIcon from "@iconify-react/ep/arrow-left-bold";
import NextArrowIcon from "@iconify-react/ep/arrow-right-bold";
import NavMenuIcon from "@iconify-react/mdi/menu";
import ArrowRightThinIcon from "@iconify-react/mdi/arrow-right-thin";
import CloseIcon from "@iconify-react/material-symbols/close";
import Instagram from "@iconify-react/bi/instagram";
import TwitterX from "@iconify-react/bi/twitter-x";
import Tiktok from "@iconify-react/bi/tiktok";
import Rating from "@iconify-react/material-symbols/star";

const shopbag = () => (
  <ShopBagIcon className="size-6 md:size-8 text-stone-300" />
);
const favorite = (props) => (
  <FavoriteIcon className="size-6 md:size-8 text-stone-300" {...props} />
);
const favoriteOutline = (props) => (
  <FavoriteOutlineIcon className="size-6 md:size-8 text-stone-300" {...props} />
);
const account = () => (
  <AccountIcon className="size-7 md:size-10 text-stone-300 translate-x-0 xl:translate-x-1.25" />
);
const prevArrow = (props) => <PrevArrowIcon {...props} />;
const nextArrow = (props) => <NextArrowIcon {...props} />;
const navMenu = () => (
  <NavMenuIcon className="size-6 md:size-8 text-stone-300" />
);
const arrowRightThin = (props) => <ArrowRightThinIcon {...props} />;
const close = (props) => <CloseIcon {...props} />;
const instagramIcon = (props) => <Instagram {...props} />;
const twitterXIcon = (props) => <TwitterX {...props} />;
const tiktokIcon = (props) => <Tiktok {...props} />;
const ratingIcon = (props) => <Rating {...props} />;

export {
  shopbag,
  favorite,
  favoriteOutline,
  account,
  prevArrow,
  nextArrow,
  navMenu,
  arrowRightThin,
  close,
  instagramIcon,
  twitterXIcon,
  tiktokIcon,
  ratingIcon,
};
