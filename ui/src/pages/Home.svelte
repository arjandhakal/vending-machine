<script lang="ts">
  import { Pages } from "../constants";
  import { displayPage } from "../store/index";
  import MessagePanel from "../lib/MessagePanel.svelte";
  import { routes } from "../route";

  const filteredRoutes = routes.filter((route) => route.page != Pages.HOME);
  function changePage(page: Pages) {
    displayPage.set({
      current: page,
    });
  }
</script>

<div>
  <h1>Digital Vending Machine</h1>
  <MessagePanel>Simple and easy to use digital vending machine</MessagePanel>
  {#each filteredRoutes as route}
    <button on:click={() => changePage(route.page)}>
      {route.title}
    </button>
  {/each}
</div>
