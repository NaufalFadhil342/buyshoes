import { account, favorite, shopbag } from "../Components/Icons/draftIcon";

export const navbarLinks = [
  { name: "Shoes", path: "/shoes", keyName: "shoes" },
  { name: "Men", path: "/shoes/men", keyName: "men" },
  { name: "Women", path: "/shoes/women", keyName: "women" },
  { name: "Trending", path: "/shoes/trending", keyName: "trending" },
  { name: "Sports", path: "/shoes/sports", keyName: "sports" },
  { name: "Brands", path: "/shoes/brands", keyName: "brands" },
];

export const usersMenu = [
  {
    path: "/signin",
    keyName: "signin",
    icon: account,
    name: "Signin",
    badge: false,
  },
  {
    path: "/favorite",
    keyName: "favorites",
    icon: favorite,
    name: "Favorites",
    badge: true,
    hasDropdown: true,
  },
  {
    path: "/bag",
    keyName: "shoppingBag",
    icon: shopbag,
    name: "Shop",
    badge: true,
    hasDropdown: false,
  },
];
