<script lang="ts">
    import Desktop from "$lib/Desktop.svelte";
    import WindowComp from "$lib/window/Window.svelte";
    import Taskbar from "$lib/Taskbar.svelte";
    import { Window, windowStore } from "$lib/window/WindowStore";

    import Emacs from "$lib/Emacs.svelte";
    import Terminal from "$lib/Terminal.svelte";

    import { onMount } from "svelte";

    onMount(() => {
        Window.isMobile = (window.innerWidth <= 600 && window.innerHeight <= 800); 
    });
</script>

<svelte:head>
    <title>imre.al</title>
</svelte:head>

<Desktop />

<WindowComp 
    name="imre.al" 
    slot={Emacs} 
    options={{
        maximised: true
    }}
/>

<!-- <WindowComp  -->
<!--     name="terminal" -->
<!--     options={{ -->
<!--         type: "terminal", -->
<!--         minimised: true, -->
<!--         focused: false -->
<!--     }} -->
<!--     position={{ -->
<!--         topPercent: 50, -->
<!--         leftPercent: 60 -->
<!--     }} -->
<!--     slot={Terminal} -->
<!-- /> -->

<Taskbar />

<style>

</style>
