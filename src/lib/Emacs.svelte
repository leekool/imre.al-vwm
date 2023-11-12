<script lang="ts">
    import PostNav from "$lib/post/PostNav.svelte";
    import PostContent from "$lib/post/Post.svelte";
    import { Post, postStore } from "$lib/post/PostStore";

    // const lineCount = (): number[] => {
    //     const lineCount = content.match(/\n/g);
    //     if (!lineCount) return [1];
    //
    //     const lines: number[] = [];
    //     for (let i = 1; i < lineCount.length + 2; i++) lines.push(i);
    //     return lines;
    // };

    // const wordCount = (): number => {
    //     const wordCount = content.match(/\n| /g);
    //     return wordCount ? wordCount.length : 1;
    // };

    let navVisible = true;

    const toggleNav = () => {
        navVisible = !navVisible;
    }

    $: $postStore, Post.selectedPost = Post.selectedPost;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="main">
    <div class="body">
        <div class="content">
            <PostContent />
        </div>
    </div>

    <div 
        class="footer"
        on:click={() => toggleNav()}
    >
        <span class="circle" />
        <span class="file-size" />
        <span class="footer-text">
            <span style="color: #acbc68; margin-left: 9px;">
                imre.al/{Post.selectedPost?.file ?? ""}
            </span>
            <!-- <span class="word-count"> -->
                <!-- {lineCount()[lineCount().length - 1]}:{wordCount()} -->
            <!-- </span> -->
        </span>
        <span 
            class="folder"
            class:ri-folder-open={navVisible}
            class:ri-folder={!navVisible}
        />
    </div>

    {#if navVisible}
        <PostNav />
    {/if}

</div>

<style>
    @import url("/fonts/real-icons.css");

    .main {
        display: flex;
        flex: 1 1 auto;
        height: 100%;
        flex-direction: column;
        background-color: #1d1f21;
    }

    .body {
        padding: 10px 0 10px 0;
        display: flex;
        flex: 1 1 auto;
        position: relative;
        font-family: "Tamzen", sans-serif;
        background-color: #1d1f21;
        -ms-overflow-style: none; /* ie & edge */
        scrollbar-width: none; /* firefox */
    }

    .folder {
        display: flex;
        position: absolute;
        right: 0;
        padding: 4px 4px 7px 4px;
        font-size: 0.8rem;
        color: #93a643;
        cursor: pointer;
    }

    .folder:hover {
        color: #a7b83d;
    }

    .lines {
        width: 25px;
        height: 100%;
        color: #3f4040;
        text-align: right;
        white-space: pre-line;
        user-select: none;
    }

    .content {
        height: 100%;
        /* width: 100%; */
        width: calc(100% - 20px);
        margin: 0 10px;
        color: #e4e3d5;
        /* white-space: pre-line; */
    }

    .content .heading {
        color: #5b5d52;
    }

    .footer {
        display: flex;
        align-items: center;
        padding-top: 1px;
        color: #e4e3d5;
        font-weight: 900;
        width: 100%;
        height: 22px;
        background-color: #0f1011;
        user-select: none;
        /* box-shadow: 8px 0 0 0 #81a2be inset; */
    }

    .footer:before {
        content: "";
        height: 100%;
        width: 8px;
        padding-top: 1px;
        background-color: #81a2be;
    }

    .footer-text {
        display: flex;
        white-space: pre;
    }

    .circle {
        height: 12px;
        width: 12px;
        margin: 0 5px 2px 12px;
        background-color: #b294bb;
        border-radius: 50%;
    }

    .file-size {
        margin-left: 10px;
    }

    .word-count {
        margin-left: 10px;
    }

    /* @media screen and (max-width: 700px) { */
    /*     .footer-text { */
    /*         padding-top: 1px; */
    /*     } */
    /* } */
</style>
