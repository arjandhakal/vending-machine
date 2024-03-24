import { Pages } from "./constants";
import Home from "./pages/Home.svelte";
import Items from "./pages/Items.svelte";

export const routes = [
  {
    title: "Home",
    page: Pages.HOME,
  },
  {
    title: "Items List",
    page: Pages.ITEMS,
  },
];
