<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import PostNav from "$lib/post/PostNav.svelte";
    import type { ComponentType } from "svelte";
    // const title = new Date().toLocaleDateString("en-GB").replace(/\//g, "") + ".org";
    // const content = "\n\n";

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
    // let data: Data;
    let selectedPost: { index: number | null, content: ComponentType, path: string };
</script>

<div class="main">
    <div class="body">
        <!-- <div class="lines"> -->
        <!--     {#each lineCount() as line} -->
        <!--         <p>{line}</p> -->
        <!--     {/each} -->
        <!-- </div> -->
        <div class="content">
            <Router>
                <Route component={selectedPost?.content} />
            </Router>
            <!-- <PostNav bind:data /> -->
            <!-- <span class="heading">#+TITLE:</span> imre.al -->
            <!-- <span class="heading">#+AUTHOR:</span> Lee Luppi -->
            <!-- <span class="heading">#+EMAIL:</span> lee@imre.al -->
        </div>
    </div>

    <div class="footer">
        <span class="circle" />
        <span class="file-size" />
        <span class="footer-text">
            <span style="color: #acbc68; margin-left: 9px;">imre.al/{selectedPost?.path}</span>
            <span class="word-count">
                <!-- {lineCount()[lineCount().length - 1]}:{wordCount()} -->
            </span>
        </span>
    </div>

    <PostNav bind:selectedPost />

</div>

<style>
    .main {
        display: flex;
        flex: 1 1 auto;
        height: 100%;
        flex-direction: column;
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
        box-shadow: 8px 0 0 0 #81a2be inset;
        user-select: none;
    }

    .footer-text {
        margin-top: 2px;
        white-space: pre;
    }

    .circle {
        height: 12px;
        width: 12px;
        margin: 1px 5px 2px 20px;
        background-color: #b294bb;
        border-radius: 50%;
    }

    .file-size {
        margin-left: 10px;
    }

    .word-count {
        margin-left: 10px;
    }

    p {
        margin: 0;
    }
</style>
