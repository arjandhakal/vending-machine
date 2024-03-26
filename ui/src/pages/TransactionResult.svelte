<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { cart, displayPage, navigateTo } from "../store/index";
    import { fly } from "svelte/transition";
    import CustomButton from "../lib/CustomButton.svelte";
    import { Pages } from "../constants";

    let pageData: Record<string, any> | undefined;
    let cartItems: CartItem[] = [];
    let coinReturned = 0;
    let cashReturned = 0;
    let transactionMsg: string = "";

    $: {
        if (pageData?.data?.cartItems) {
            cartItems = [...pageData.data.cartItems];
        }
        if (pageData?.data?.change?.coins) {
            coinReturned = pageData.data.change.coins;
        }
        if (pageData?.data?.change?.cash) {
            cashReturned = pageData.data.change.cash;
        }
        if (pageData?.message) {
            transactionMsg = pageData.message;
        }
    }
    const unsubscribeDisplayPage = displayPage.subscribe((v) => (pageData = v));

    onMount(() => {
        if (pageData && pageData.success) {
            cart.clearCart();
        }
    });

    onDestroy(unsubscribeDisplayPage);
</script>

<section in:fly={{ x: -200, duration: 300, delay: 300 }}>
    {#if pageData && pageData.success}
        <h3>Purchase Complete!</h3>

        <h4>Items dispatched:</h4>
        <div class="cart-items">
            {#each cartItems as item (item.id)}
                <span> {item.quantity} {item.name}</span>
            {/each}
        </div>
        <hr />
        <h4>Change Returned:</h4>
        <div class="change-return">
            <span> Coins: {coinReturned} </span>
            <span> Cash: {cashReturned} </span>
        </div>

        <div class="return-btn">
            <CustomButton
                onClick={() => navigateTo(Pages.HOME)}
                buttonLabel="← Back to Home"
                ariaLabel="Back to items page"
            />
        </div>
    {:else}
        <div class="error-box">
            <h3>Unable to complete purchase</h3>
            <p>{transactionMsg}</p>
            <CustomButton
                onClick={() => navigateTo(Pages.INSERT_CURRENCY)}
                buttonLabel="← Back to Purchase Page"
                ariaLabel="Back to purchase page"
            />
        </div>
    {/if}
</section>

<style>
    h3,
    h4 {
        margin: 0;
    }

    .cart-items {
        display: flex;
        flex-direction: column;
    }

    .change-return {
        display: flex;
        justify-content: space-around;
    }

    .return-btn {
        margin-top: 20px;
    }

    .error-box {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
