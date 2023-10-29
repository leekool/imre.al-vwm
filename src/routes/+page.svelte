<script lang="ts">
    import { onMount } from "svelte";

    import Window from "../lib/window/Window.svelte";

    import Emacs from "../lib/Emacs.svelte";
    import Terminal from "../lib/Terminal.svelte";

    import Taskbar from "../lib/Taskbar.svelte";

    onMount(() => {

    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Window name="imre.al">
    <Emacs />
</Window>

<Window 
    name="terminal"
    options={{
        type: "window-terminal"
    }}
    position={{
        topPercent: 50,
        leftPercent: 60
    }}
>
    <Terminal />
</Window>

<Taskbar />

<style>

</style>
