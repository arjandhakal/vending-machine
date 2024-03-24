<script lang="ts">
  import CustomButton from "./CustomButton.svelte";
  import { cart } from "../store/index";

  export let item: Product | undefined;
</script>

{#if item}
  <div class="item-box">
    <div>{item.name}</div>
    <div>Price: Rs {item.price}</div>
    <div>In stock: {item.stock}</div>
    <div class="buttons">
      <CustomButton
        ariaLabel="Plus"
        buttonLabel="+"
        styleClass="button-reverse"
        onClick={() => item && cart.addItem(item)}
      />
      <CustomButton
        ariaLabel="Minus"
        buttonLabel="&minus;"
        styleClass="button-reverse"
        onClick={() => item && cart.removeItem(item)}
      />
    </div>
  </div>
{/if}

<style>
  .item-box {
    max-width: 100px;
    border: 2px solid var(--theme-text-color);
    border-radius: 15px;
    padding: 10px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }
</style>
