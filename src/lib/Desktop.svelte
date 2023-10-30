<script lang="ts">
    import { windowStore, desktopIcons, Window } from "./window/WindowStore";
    import WindowComponent from "./window/Window.svelte";
    import Emacs from "../lib/Emacs.svelte";
    import Terminal from "../lib/Terminal.svelte";

    const toggleHighlight = (w: Window) => {
        w.options.highlight = !w.options.highlight;
        $desktopIcons = $desktopIcons; // trigger change detection
        $windowStore = $windowStore;
    }

    const clearHighlight = () => {
        $desktopIcons.forEach((w: Window) => {
            w.options.highlight = false;
        });

        $desktopIcons = $desktopIcons; // trigger change detection
    }

    let clickCount = 0;

    const handleClick = (w: Window) => {
        let clickTimer: ReturnType<typeof setTimeout>;

        toggleHighlight(w);

        clickCount++;

        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
                clearTimeout(clickTimer);
            }, 200);
        } else if (clickCount === 2) {
            const windowMatch = $windowStore.find(window => window.name === w.name);

            if (windowMatch) {
                if (!windowMatch.options.focused) windowMatch.getFocus();
            } else {
                updateIcons();
                openWindow(w);
            }
        }
    }

    const openWindow = (w: Window) => {
        const contentDiv = document.querySelector("div[style='display: contents']")!;
        const target = document.createElement("div"); 
        contentDiv.appendChild(target);

        const getSlot = (type: string) => {
            switch (type) {
                case "emacs": return Emacs;
                case "terminal": return Terminal
            }
        }

        new WindowComponent({
            target,
            props: { name: w.name, options: w.options, position: w.position, slot: getSlot(w.options.type) }
        });
    }

    const updateIcons = (): void => {
        const updatedIcons: Window[] = $desktopIcons.map(icon => {
            const match = $windowStore.find(window => window.name === icon.name);

            return match ? ({ ...icon, ...match } as Window) : icon;
        });

        updatedIcons.sort((a, b) => a.name.localeCompare(b.name)); // sort alphabetically by name

        $desktopIcons = updatedIcons;
    }
</script>

<!-- preload highlighted icons -->
<svelte:head>
   {#each $desktopIcons as window}
        <link rel="preload" as="image" href={"images/icons/" + window.name + "-icon-desktop-highlight.png"} />
   {/each}
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="desktop" on:click={() => clearHighlight()}>
    <div class="icon-container" on:click|stopPropagation>
        {#each $desktopIcons as window}
            <div
                class="desktop-icon"
                on:click|stopPropagation={() => handleClick(window)}

            >
            {#if !window.options.highlight}
                <img src={"images/icons/" + window.name + "-icon-desktop.png"} alt={window.name} />
            {/if}
            {#if window.options.highlight}
                <img src={"images/icons/" + window.name + "-icon-desktop-highlight.png"} alt={window.name} />
            {/if}
                <span class:desktop-icon-highlight={window.options.highlight}>
                    {window.name}
                </span>
            </div>
        {/each}
    </div>
</div>

<style>
    .desktop {
        display: flex;
        width: 100%;
        font-family: "Tamzen", sans-serif;
        font-size: 15px;
    }

    .icon-container {
        margin: 30px 0 0 20px;
        max-width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        image-rendering: pixelated;
    }

    .desktop-icon {
        display: flex;
        height: 102px;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-size: 16px;
        text-shadow: 1px 1px #fffefe;
        text-align: center;
        user-select: none;
    }

    .desktop-icon img {
        max-width: 80%;
    }

    .desktop-icon span {
        padding: 2px 4px 0 4px;
        line-height: 16px;
    }

    .desktop-icon-highlight {
        background: rgba(4, 4, 252, 0.3);
        color: #fffefe;
        outline: 1px dotted rgba(255, 254, 254, 0.5);
        text-shadow: none;
    }
</style>
