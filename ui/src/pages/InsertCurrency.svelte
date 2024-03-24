<script lang="ts">
  import { Pages } from "../constants";
  import { navigateTo } from "../store/index";
</script>

<div>
  <button on:click={() => navigateTo(Pages.ITEMS)}> Back to home </button>
</div>
