<script lang="ts">
    import { displayPage, navigateTo } from "../store/index";
    import { fly } from "svelte/transition";
    import CustomButton from "../lib/CustomButton.svelte";
    import { Pages } from "../constants";
    import { onDestroy } from "svelte";

    let pageData: Record<string, any> | undefined;
    let itemReturned: Product | undefined;

    let coinsReturned = 0;
    let cashReturned = 0;
    let transactionMsg: string = "";

    $: {
        if (pageData?.data?.coins) {
            coinsReturned = pageData.data.coins;
        }
        if (pageData?.data?.cash) {
            cashReturned = pageData.data.cash;
        }
        if (pageData?.data?.selectedItem) {
            itemReturned = pageData.data.selectedItem;
        }
        if (pageData?.message) {
            transactionMsg = pageData.message;
        }
    }

    const unsubscribeDisplayPage = displayPage.subscribe((v) => (pageData = v));
    onDestroy(unsubscribeDisplayPage);
</script>

<section in:fly={{ x: -200, duration: 300, delay: 300 }}>
    {#if pageData && pageData.success}
        <h3>
            {itemReturned ? itemReturned.name : "Item"} refunded succesfully!
        </h3>
        <hr />
        <h4>Change Returned:</h4>
        <div class="change-return">
            <span> Coins: {coinsReturned} </span>
            <span> Cash: {cashReturned} </span>
        </div>
    {:else}
        <div class="error-box">
            <h3>Unable to refund {itemReturned ? itemReturned.name : ""}</h3>
            <p>{transactionMsg}</p>
        </div>
    {/if}

    <div class="return-btn">
        <CustomButton
            onClick={() => navigateTo(Pages.HOME)}
            buttonLabel="← Back to Home"
            ariaLabel="Back to items page"
        />
    </div>
</section>

<style>
    h3,
    h4 {
        margin: 0;
    }
    .change-return {
        display: flex;
        justify-content: space-around;
    }
    .return-btn {
        margin-top: 20px;
    }
</style>
