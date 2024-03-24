<script lang="ts">
  import { sounds } from "../store/sfx";

  export let onClick: () => void;
  export let ariaLabel: string;
  export let buttonLabel: string;
  export let styleClass: string = "";
</script>

<div
  on:click={() => {
    $sounds.click();
    onClick();
  }}
  on:keydown={(event) => {
    if (event.key === "Enter") {
      onClick();
    }
  }}
  tabindex="0"
  aria-label={ariaLabel}
  class={`button ${styleClass}`}
  role="button"
>
  <button>
    {buttonLabel}
  </button>
</div>
