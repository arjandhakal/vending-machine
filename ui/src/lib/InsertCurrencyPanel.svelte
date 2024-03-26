<script lang="ts">
  import { balance } from "../store/index";
</script>

<h3>Inserted</h3>
<div class="inserted-info-box">
  <span>Cash: {$balance.data.userCashInserted}</span>
  <span>Coins: {$balance.data.userCoinsInserted} </span>
</div>

<style>
  h3 {
    margin: 0;
  }
  .inserted-info-box {
    display: flex;
    gap: 10px;
  }
</style>
