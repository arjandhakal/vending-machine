<script lang="ts">
  import { displayPage } from "./store/index";
  import Home from "./pages/Home.svelte";
  import { Pages } from "./constants";
  import Items from "./pages/Items.svelte";
  import InsertCurrency from "./pages/InsertCurrency.svelte";
</script>

<main>
  {#if $displayPage.current === Pages.HOME}
    <Home />
  {/if}

  {#if $displayPage.current === Pages.ITEMS}
    <Items />
  {/if}

  {#if $displayPage.current === Pages.INSERT_CURRENCY}
    <InsertCurrency />
  {/if}
</main>

<style></style>
