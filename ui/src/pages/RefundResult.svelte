<script>
    import { displayPage } from "../store/index";
    import { fly } from "svelte/transition";
</script>

<div in:fly={{ x: -200, duration: 300, delay: 300 }}>
    {JSON.stringify($displayPage.data)}
</div>
