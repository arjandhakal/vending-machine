<script lang="ts">
  import { onMount } from "svelte";
  import { products } from "./store";

  onMount(() => {
    products.fetchProducts().then(() => console.log("done"));
  });
</script>

<main>
  {JSON.stringify($products)}
</main>

<style></style>
