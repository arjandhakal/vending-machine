<script lang="ts">
  import { sounds } from "../store/sfx";

  export let onClick: () => void;
  export let ariaLabel: string;
  export let buttonLabel: string;
  export let styleClass: string = "";
  export let disabled: boolean = false;
  export let type: "button" | "reset" | "submit" | null | undefined = "button";
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
  class:disabled
  role="button"
>
  <button {disabled} {type}>
    {buttonLabel}
  </button>
</div>

<style>
  .disabled {
    background-color: gray;
  }
</style>
