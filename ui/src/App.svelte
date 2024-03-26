<script lang="ts">
    import { displayPage } from "./store/index";
    import Home from "./pages/Home.svelte";
    import { Pages } from "./constants";
    import Items from "./pages/Items.svelte";
    import InsertCurrency from "./pages/InsertCurrency.svelte";
    import TransactionResult from "./pages/TransactionResult.svelte";
    import RefundItem from "./pages/RefundItem.svelte";
</script>

<main>
    <h1>Digital Vending Machine</h1>
    {#if $displayPage.current === Pages.HOME}
        <Home />
    {/if}

    {#if $displayPage.current === Pages.ITEMS}
        <Items />
    {/if}

    {#if $displayPage.current === Pages.INSERT_CURRENCY}
        <InsertCurrency />
    {/if}

    {#if $displayPage.current === Pages.TRANSACTION_RESULT}
        <TransactionResult />
    {/if}

    {#if $displayPage.current === Pages.REFUND_ITEM}
        <RefundItem />
    {/if}
</main>

<style>
    main {
        display: grid;
        place-items: center;
        width: 100%;
        margin-inline: auto;
    }

    @media only screen and (min-width: 600px) {
        main {
            width: 500px;
        }
    }
</style>
