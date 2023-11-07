<script lang="ts">
    import { assets } from "$app/paths";
    import { windowStore } from "./window/WindowStore";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="taskbar">
    <div class="iconman">
        {#each $windowStore as window}
            <div
                class="iconman-button"
                class:active={window.options.focused}
                on:click={() => {
                    window.taskbarClk();
                    window = window; // tells svelte object changed
                }}
            >
                <img src={`${assets}/images/icons/${window.name}-icon-small.png`} alt={window.name} />
                <span>{window.name}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .taskbar {
        display: flex;
        position: fixed;
        height: 30px;
        width: 100%;
        /* justify-content: space-between; */
        left: 50%;
        bottom: 0;
        margin-left: -50%;
        font-family: "Tamzen", sans-serif;
        font-size: 15px;
        color: #222020;
        background-image: url("/images/footer-tile.svg");
        background-repeat: repeat;
        border-top: 1px solid #222020;
        box-shadow: 1px 1px #fffefe inset, -1px -1px #948c79 inset;
        z-index: 100;
    }

    .taskbar span {
        margin-top: 3px;
    }

    .iconman {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        box-shadow: -1px -1px #948c79 inset, 1px 1px #fffefe inset;
    }

    .iconman-button {
        display: flex;
        /* align-items: center; */
        width: 220px;
        margin: 4px 0 4px 4px;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
    }

    .iconman-button:hover {
        text-shadow: 1px 0 #948c79;
    }

    .iconman-button img {
        min-height: 13px;
        margin: 4px;
        image-rendering: pixelated;
    }

    /* .inactive { */
    /*     color: #000; */
    /*     background-image: none; */
    /*     box-shadow: none; */
    /* } */

    .active {
        color: #fffefe;
        background-image: url("/images/iconman-tile.svg");
        background-size: 6%;
        box-shadow: -1px -1px #92998b inset, 1px 1px #5c6057 inset;
    }

    .active:hover {
        text-shadow: 1px 0 #f6f6f6;
    }

    @media screen and (max-width: 700px) {
        .iconman {
            padding-right: 5px;
            overflow-y: hidden;
            overflow-x: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .iconman::-webkit-scrollbar {
            display: none;
        }

        .iconman-button {
            width: 130px;
        }
    }
</style>
