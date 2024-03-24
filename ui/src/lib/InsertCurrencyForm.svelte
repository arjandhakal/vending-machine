<script lang="ts">
  export let onSubmit: (data: { amount: number; type: string }) => void;

  const CASH = "cash";
  const COIN = "coin";
  let selectedCurrency = CASH;
  let insertAmount = 0;
  let errors: Record<string, any> = {};

  const validate = () => {
    errors = {};
    if (insertAmount < 2) {
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
    {/if}
  </div>

  <button type="submit">Insert</button>
</form>
