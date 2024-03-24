<script lang="ts">
  import { onMount } from "svelte";
  import { Pages } from "../constants";
  import { navigateTo, balance } from "../store/index";
  import CartPanel from "../lib/CartPanel.svelte";
  import InsertCurrencyForm from "../lib/InsertCurrencyForm.svelte";

  function onSubmit(data: { amount: number; type: string }) {
    console.log(data);
  }

  onMount(() => {
    balance.fetchBalance();
  });
</script>

<div>
  <button on:click={() => navigateTo(Pages.ITEMS)}> Back to Items List </button>
  <InsertCurrencyForm {onSubmit} />
  <CartPanel />
</div>
