<script lang="ts">
  import CustomButton from "./CustomButton.svelte";

  export let onSubmit: (data: { amount: number; type: string }) => void;

  const CASH = "cash";
  const COIN = "coin";
  let selectedCurrency = CASH;
  let insertAmount: number;
  let errors: Record<string, any> = {};

  const validate = () => {
    errors = {};
    if (insertAmount < 1 || !Number.isInteger(insertAmount)) {
      errors["insertAmount"] = "Amount Must be valid";
    }
  };

  function clearForm() {
    insertAmount = 0;
  }

  const validateAndSubmit = () => {
    validate();
    if (!Object.keys(errors).length) {
      onSubmit({
        amount: insertAmount,
        type: selectedCurrency,
      });
      clearForm();
      errors = {};
    }
  };
</script>

<form on:submit|preventDefault={validateAndSubmit}>
  <div class="currency-group">
    <label>
      <input
        bind:group={selectedCurrency}
        type="radio"
        name="currency"
        value={CASH}
      />
      Cash
      <input
        bind:group={selectedCurrency}
        type="radio"
        name="currency"
        value={COIN}
      /> Coin
    </label>
  </div>
  <div>
    <input
      type="number"
      name="insertAmount"
      bind:value={insertAmount}
      min="0"
      step="1"
    />
    {#if errors.insertAmount}
      <span>{errors.insertAmount}</span>
    {:else}
      <span class="error-placeholder"> Error placeholder</span>
    {/if}
  </div>
  <CustomButton
    onClick={validateAndSubmit}
    buttonLabel="Insert"
    ariaLabel="Insert coin"
    type="submit"
    styleClass="button-reverse"
  />
</form>

<style>
  input[type="number"] {
    color: var(--theme-text-color);
    border: 2px solid transparent;
    font-weight: 700;
    font-size: 24pt;
    padding: 3px 13px 0;
    border-radius: 15px;
    background-color: var(--surface-1-dark);
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus {
    border: 2px solid var(--theme-text-color);
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .error-placeholder {
    visibility: hidden;
  }
</style>
