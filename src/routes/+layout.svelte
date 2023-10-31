<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    onMount(() => {
        // console.log($page);
    })
</script>

<slot />
