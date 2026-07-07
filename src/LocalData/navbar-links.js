import { account, favorite, shopbag } from "../Components/Icons/draftIcon";

export const navbarLinks = [
  { name: "Shoes", path: "/shoes", keyName: "shoes" },
  { name: "Men", path: "/men", keyName: "men" },
  { name: "Women", path: "/women", keyName: "women" },
  { name: "Trending", path: "/trending", keyName: "trending" },
  { name: "Sports", path: "/sports", keyName: "sports" },
  { name: "Brands", path: "/brands", keyName: "brands" },
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
