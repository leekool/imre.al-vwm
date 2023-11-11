<script lang="ts">
    import { Window, windowStore } from "$lib/window/WindowStore";

    export let window_: Window;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="navbar" class:inactive={!window_.options.focused}>
    <div class="navbar-title">{window_.name}</div>

    <div class="navbar-divider" style="width: 6px;" />

    <!-- info button -->
    {#if window_.options.navbar.info}
        <div class="navbar-btn-base">
            <div
                class="navbar-btn-inner info-btn"
                on:click|self={() => console.log("window info: ", window_)}
            >
                <!-- {#if window_.options.focused} -->
                <!--     <div class="info-container"> -->
                <!---->
                <!--         {#if window_.options.type?.includes("layout")} -->
                <!--             <div class="info-layout-container"> -->
                <!--                 <div class="info-layout-column" style="width: 35%;"> -->
                <!--                     <div class="info-layout-item">board:</div> -->
                <!--                     <div class="info-layout-item">file:</div> -->
                <!--                     <div class="info-layout-item">size:</div> -->
                <!--                 </div> -->
                <!--                 <div class="info-layout-column"> -->
                <!--                     <div class="info-layout-item" style="font-style: italic;">{window_.options.layoutInfo?.name}</div> -->
                <!--                     <div class="info-layout-item" style="font-style: italic;">{window_.options.layoutInfo?.fileName}</div> -->
                <!--                     <div class="info-layout-item" style="font-style: italic;">{window_.options.layoutInfo?.fileSize}</div> -->
                <!--                 </div> -->
                <!--             </div> -->
                <!--             <div style="min-height: 30px;"></div> -->
                <!--             <div -->
                <!--                 class="download-btn pixel-corners" -->
                <!--                 title="Download" -->
                <!--                 on:click={() => { -->
                <!--                     window_.screenshotCanvas(); -->
                <!--                 }} -->
                <!--             > -->
                <!--                 <div class="download-btn-icon" /> -->
                <!--             </div> -->
                <!--         {/if} -->
                <!---->
                <!--     </div> -->
                <!-- {/if} -->
            </div>
        </div>
    {/if}

    <div class="navbar-divider" />

    <!-- minimise button (left) -->
    {#if window_.options.navbar.minimise}
        <div
            class="navbar-btn-inner ri-minimise minimise-btn"
            on:click={() => {
                window_.toggleMinimise();
                $windowStore = $windowStore; // tells svelte object changed
            }}
        />
    {/if}

    <!-- maximise button (centre) -->
    {#if window_.options.navbar.maximise}
        <div
            class="navbar-btn-inner ri-maximise maximise-btn"
            on:click={() => {
                window_.toggleMaximise();
                $windowStore = $windowStore; // tells svelte object changed
            }}
        />
    {/if}

    <!-- close button (right) -->
    {#if window_.options.navbar.close}
        <div
            class="navbar-btn-inner ri-close close-btn"
            on:click={() => {
                window_.kill();
                $windowStore = $windowStore; // tells svelte object changed
            }}
        />
    {/if}

    <div class="navbar-divider" style="width: 6px;" />
</div>

<style>
    @import url("/fonts/real-icons.css");

    .navbar {
        display: flex;
        height: 25px;
        font-size: 15px;
        color: #e4e3d5;
        align-items: center;
        justify-content: space-between;
        user-select: none;
        box-shadow: 0 -1px 0 0 #5c6057 inset;
        background-image: url("/images/navbar-tile.svg");
        background-repeat: repeat;
        padding-bottom: 1px;
    }

    .navbar-divider {
        width: 100%;
    }

    .navbar-title {
        display: flex;
        position: absolute;
        align-items: center;
        height: 28px;
        line-height: 30px;
        left: 50%;
        transform: translate(-50%);
        /* font-weight: bold; */
        pointer-events: none;
    }

    .navbar-btn-inner {
        display: flex;
        font-size: 8px;
        padding: 6px;
        aspect-ratio: 1 /1;
        margin-left: 2px;
        margin-bottom: 2px;
        position: relative;
        cursor: pointer;
    }

    .navbar-btn-inner:hover {
        opacity: 0.4;
    }

    .info-btn {
        /* position: relative; */
        cursor: default;
    }

    .info-btn:after {
        content: "i";
        display: flex;
        position: relative;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-content: center;
        color: #333366;
        font-weight: 900;
        font-size: 14px;
        text-shadow: 0 1px #f5f5f5, 0 2px rgba(138, 134, 160, 0.7);
    }

    /* .info-btn:hover .info-container { */
    /*     display: block; */
    /* } */

    /* .info-container { */
    /*     display: none; */
    /*     position: absolute; */
    /*     padding: 5px; */
    /*     top: 30px; */
    /*     left: 17px; */
    /*     max-width: 180px; */
    /*     background-color: #e4e4e4; */
    /*     border: 2px solid #000; */
    /*     box-shadow: -2px -2px 0 0 #c2c2c2 inset, 2px 2px 0 0 #f5f5f5 inset; */
    /*     cursor: default; */
    /* } */

    /* .info-layout-container { */
    /*     display: flex; */
    /*     margin: 1px 0 0 4px; */
    /* } */

    /* .info-layout-column { */
    /*     display: flex; */
    /*     flex-wrap: wrap; */
    /*     width: 50%; */
    /* } */

    /* .info-layout-item { */
    /*     display: flex; */
    /*     width: 100%; */
    /* } */

    /* to add padding without affecting .info-container's border/box shadow */
    /* .info-container:after { */
    /*     content: ""; */
    /*     position: absolute; */
    /*     height: calc(100% + 15px); */
    /*     width: calc(100% + 15px); */
    /*     transform: translate(-50%, -50%); */
    /*     left: 50%; */
    /*     top: 50%; */
    /*     z-index: 0 !important; */
    /* } */

    /* .download-btn { */
    /*     display: flex; */
    /*     position: absolute; */
    /*     height: 27px; */
    /*     aspect-ratio: 1 / 1; */
    /*     right: 6px; */
    /*     bottom: 6px; */
    /*     align-items: center; */
    /*     justify-content: center; */
    /*     font-family: "Tamzen", sans-serif; */
    /*     font-size: 15px; */
    /*     background-color: #e0e0e0; */
    /*     box-sizing: border-box; */
    /*     box-shadow: -2px -2px 0 0 #c2c2c2 inset, 2px 2px 0 0 #f5f5f5 inset; */
    /*     cursor: pointer; */
    /*     z-index: 10 !important; */
    /* } */

    /* .download-btn:hover { */
    /*     box-shadow: -2px -2px 0 0 #f5f5f5 inset, 2px 2px 0 0 #c2c2c2 inset; */
    /* } */

    /* .download-btn > * { */
    /*     user-select: none; */
    /*     cursor: pointer; */
    /* } */

    /* maybe make it a floppy disc or something */
    /* .download-btn-icon { */
    /*     height: 70%; */
    /*     width: 70%; */
    /*     content: url("images/left-arrow.svg"); */
    /*     transform: rotate(270deg); */
    /* } */

    /* .inactive { */
        /* border-color: #d0d0d0 #a7a7a7 #a7a7a7 #d0d0d0; */
    /* } */

    /* .inactive .navbar-btn-inner { */
        /* box-shadow: -2px -2px 0 0 #454545 inset; */
    /* } */

    /* .inactive .navbar-btn-right { */
    /*     box-shadow: -2px -2px 0 0 #454545 inset, -6px -6px 0 0 #a4a4a4 inset, */
    /*         -8px -8px 0 0 #454545 inset; */
    /* } */
</style>
