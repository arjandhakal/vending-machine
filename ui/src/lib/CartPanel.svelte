<script lang="ts">
  import { cart, cartTotal } from "../store";
</script>

<div class="cart-items">
  {#each $cart as cartItem (cartItem.id)}
    <span>
      {cartItem.name} - {cartItem.quantity}
    </span>
  {/each}
</div>

<div class="cart-cost">
  Cost: Rs {$cartTotal}
</div>

<style>
  .cart-items {
    display: flex;
    gap: 10px;
  }
</style>
