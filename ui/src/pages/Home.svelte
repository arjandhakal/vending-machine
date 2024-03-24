<script lang="ts">
  import { Pages } from "../constants";
  import { navigateTo } from "../store/index";
  import MessagePanel from "../lib/MessagePanel.svelte";
  import { routes } from "../route";
  import { fly } from "svelte/transition";

  const filteredRoutes = routes.filter((route) => route.page != Pages.HOME);
</script>

<div
  in:fly={{ x: -200, duration: 300, delay: 300 }}
  out:fly={{ x: -200, duration: 300 }}
>
  <h1>Digital Vending Machine</h1>
  <MessagePanel>Simple and easy to use digital vending machine</MessagePanel>
  {#each filteredRoutes as route}
    <button on:click={() => navigateTo(route.page)}>
      {route.title}
    </button>
  {/each}
</div>
