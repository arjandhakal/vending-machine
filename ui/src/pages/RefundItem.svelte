<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import CustomButton from "../lib/CustomButton.svelte";
    import { navigateTo, products } from "../store/index";
    import { Pages } from "../constants";
    import { sounds } from "../store/sfx";
    import { makeRefundAPI } from "../api";

    let selectedItem: Product | null = null;
    let isRefunding: boolean = false;

    function selectItem(item: Product) {
        $sounds.click();
        selectedItem = item;
    }

    async function makeRefund() {
        if (!selectedItem) {
            return;
        }
        try {
            isRefunding = true;
            const result = await makeRefundAPI(selectedItem.id);
            navigateTo(Pages.REFUND_RESULT, {
                success: true,
                message: "Item refunded succesfully",
                data: { ...result.data, selectedItem },
            });
        } catch (error) {
            navigateTo(Pages.REFUND_RESULT, {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occured",
                data: null,
            });
        }
    }

    onMount(() => {
        products.fetchProducts();
    });
</script>

<section in:fly={{ x: -200, duration: 300, delay: 300 }}>
    <div class="back-button">
        <CustomButton
            onClick={() => navigateTo(Pages.HOME)}
            buttonLabel="← Back"
            ariaLabel="Back to Home"
            disabled={isRefunding}
        />
    </div>
    <h3>Select Item to Refund</h3>
    <div class="items-list">
        {#each $products.data as item (item.id)}
            <div
                class="item"
                class:selected={selectedItem && selectedItem.id === item.id}
                role="button"
                aria-label={`Select ${item.name}`}
                tabindex="0"
                on:click={() => {
                    selectItem(item);
                }}
                on:keydown={(e) => {
                    if (e.key === "Enter") {
                        selectItem(item);
                    }
                }}
            >
                <span>{item.name}</span>
                <span> Rs {item.price}</span>
            </div>
        {/each}
    </div>

    {#if selectedItem}
        <div>
            <CustomButton
                onClick={makeRefund}
                buttonLabel={isRefunding ? "Refunding..." : "Refund"}
                ariaLabel="Refund"
                disabled={isRefunding}
            />
        </div>
    {/if}
</section>

<style>
    .items-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .item {
        border: 1px solid var(--theme-text-color);
        border-radius: 15px;
        padding-block: 15px;
        padding-inline: 20px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }

    .selected {
        background: var(--theme-text-color);
        color: var(--surface-1-dark);
    }
</style>
