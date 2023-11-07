<script lang="ts">
    import Desktop from "../lib/Desktop.svelte";
    import Window from "../lib/window/Window.svelte";
    import Taskbar from "../lib/Taskbar.svelte";

    import Emacs from "../lib/Emacs.svelte";
    import Terminal from "../lib/Terminal.svelte";
</script>

<svelte:head>
    <title>imre.al</title>
</svelte:head>

<Desktop />

<Window name="imre.al" slot={Emacs} />

<Window 
    name="terminal"
    options={{
        type: "terminal",
        minimised: true,
        focused: false
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
