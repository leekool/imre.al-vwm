<script lang="ts">
    import { windowStore, Window } from "./window/WindowStore";

    const toggleHighlight = (window: Window) => {
        window.options.highlight = !window.options.highlight;
        $windowStore = $windowStore; // trigger change detection
    }

    const clearHighlight = () => {
        $windowStore.forEach((window: Window) => {
            if (window.options.highlight) toggleHighlight(window);
        });
    }

    let clickCount = 0;

    const handleClick = (e: MouseEvent, window: Window) => {
        e.stopPropagation();

        let clickTimer: ReturnType<typeof setTimeout>;

        toggleHighlight(window);

        clickCount++;

        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
                clearTimeout(clickTimer);
            }, 200);
        } else if (clickCount === 2) {
            window.getFocus();
            clearTimeout(clickTimer!);
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="desktop" on:click={() => clearHighlight()}>
    <div class="icon-container" on:click|stopPropagation>
        {#each $windowStore as window}
            <div
                class="desktop-icon"
                on:click={(e) => handleClick(e, window)}

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
