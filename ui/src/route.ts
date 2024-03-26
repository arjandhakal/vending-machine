import { Pages } from "./constants";
import Home from "./pages/Home.svelte";
import Items from "./pages/Items.svelte";

export const routes = [
    {
        title: "Home",
        page: Pages.HOME,
    },
    {
        title: "Browse Items",
        page: Pages.ITEMS,
    },
    {
        title: "Refund Item",
        page: Pages.REFUND_ITEM,
    },
];
