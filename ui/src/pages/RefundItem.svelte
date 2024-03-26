<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import CustomButton from "../lib/CustomButton.svelte";
    import { navigateTo, products } from "../store/index";
    import { Pages } from "../constants";

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
        />
    </div>
    <h3>Select Item to Refund</h3>
    <div class="items-list">
        {#each $products.data as item (item.id)}
            <div>
                {item.name}
            </div>
        {/each}
    </div>

    <div>
        <CustomButton
            onClick={() => null}
            buttonLabel="Refund"
            ariaLabel="Refund"
        />
    </div>
</section>
