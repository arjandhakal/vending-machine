<script lang="ts">
  import { displayPage } from "./store";
  import Home from "./pages/Home.svelte";
  import { Pages } from "./constants";
  import Items from "./pages/Items.svelte";
</script>

<main>
  {#if $displayPage.current === Pages.HOME}
    <Home />
  {/if}

  {#if $displayPage.current === Pages.ITEMS}
    <Items />
  {/if}
</main>

<style></style>
