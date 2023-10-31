<script lang="ts">
    import { onMount } from "svelte";

    import Window from "../lib/window/Window.svelte";
    import { windowStore } from "$lib/window/WindowStore";

    import Desktop from "../lib/Desktop.svelte";
    import Emacs from "../lib/Emacs.svelte";
    import Terminal from "../lib/Terminal.svelte";

    import Taskbar from "../lib/Taskbar.svelte";

    onMount(() => {
        console.log($windowStore)
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Desktop />

<Window name="imre.al" slot={Emacs} />

<Window 
    name="terminal"
    options={{
        type: "terminal"
    }}
    position={{
        topPercent: 50,
        leftPercent: 60
    }}
    slot={Terminal}
/>

<Taskbar />

<style>

</style>
