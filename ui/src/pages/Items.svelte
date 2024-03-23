<script lang="ts">
  import { onMount } from "svelte";
  import { products } from "../store/index";

  onMount(() => {
    products.fetchProducts();
  });
</script>

{#each $products.data as item (item.id)}
  <div>Item: {item.name}</div>
  <div>Price {item.price}</div>
  <hr />
{/each}
