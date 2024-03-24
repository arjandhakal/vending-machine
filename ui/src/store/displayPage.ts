import { writable } from "svelte/store";
import { Pages } from "../constants";

export const displayPage = writable<{
  current: Pages;
  data?: Record<string, any>;
}>({ current: Pages.HOME, data: {} });

export function navigateTo(page: Pages, data?: Record<string, any>) {
  displayPage.set({
    current: page,
    ...(data ? data : { data }),
  });
}
