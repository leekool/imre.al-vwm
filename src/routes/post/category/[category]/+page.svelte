<script lang="ts">
    import Posts, { type Data } from "$lib/Posts.svelte";

    export let data: Data;
</script>

<svelte:head>
    <title>imre.al</title>
</svelte:head>

<Posts bind:data />
