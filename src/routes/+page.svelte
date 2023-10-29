<script lang="ts">
    import Window from "../lib/window/Window.svelte";
    import Emacs from "../lib/Emacs.svelte";
    import Taskbar from "../lib/Taskbar.svelte";
    import { onMount } from "svelte";

    onMount(() => {

    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Window name="imre.al">
    <Emacs />
</Window>

<Taskbar />

<style>

</style>
