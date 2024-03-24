<script lang="ts">
  import { cart, cartTotal } from "../store";
</script>

<div>
  <h3>Cart Items</h3>
  <div class="cart-items">
    {#each $cart as cartItem (cartItem.id)}
      <span>
        {cartItem.name}: {cartItem.quantity}
      </span>
    {/each}
  </div>
</div>

<div class="cart-cost">
  Price: Rs {$cartTotal}
</div>

<style>
  h3 {
    margin: 0;
  }
  .cart-items {
    display: flex;
    gap: 10px;
  }
</style>
