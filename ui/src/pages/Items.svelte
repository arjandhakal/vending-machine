<script lang="ts">
    import { onMount } from "svelte";
    import { products, cart, navigateTo } from "../store/index";
    import { fly } from "svelte/transition";
    import CartPanel from "../lib/CartPanel.svelte";
    import { Pages } from "../constants";
    import CustomButton from "../lib/CustomButton.svelte";
    import ItemBox from "../lib/ItemBox.svelte";
    import Loading from "../lib/Loading.svelte";

    function handleContinue() {
        navigateTo(Pages.INSERT_CURRENCY);
    }

    function handleCancel() {
        cart.clearCart();
        navigateTo(Pages.HOME);
    }

    function fetchProducts() {
        products.fetchProducts();
    }

    onMount(() => {
        fetchProducts();
    });
</script>

<section in:fly={{ x: -200, duration: 300, delay: 300 }}>
    <div class="back-button">
        <CustomButton
            onClick={() => navigateTo(Pages.HOME)}
            buttonLabel="← Back"
            ariaLabel="Back to Home"
        />
    </div>
    {#if $products.isFetching}
        <Loading />
    {:else if $products.error}
        <h3>Could not fetch items: {$products.error}</h3>
        <CustomButton
            onClick={fetchProducts}
            buttonLabel="Retry"
            ariaLabel="Retry"
        />
    {:else}
        <div class="items-list">
            {#each $products.data as item (item.id)}
                <ItemBox {item} />
            {/each}
        </div>
        <hr />
        <CartPanel />
        {#if $cart.length > 0}
            <div class="action-btns">
                <CustomButton
                    ariaLabel="Continue"
                    buttonLabel="Continue"
                    onClick={handleContinue}
                />
                <CustomButton
                    ariaLabel="Cancel"
                    buttonLabel="Cancel"
                    styleClass="button-reverse"
                    onClick={handleCancel}
                />
            </div>
        {/if}
    {/if}
</section>

<style>
    .action-btns {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .items-list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>
