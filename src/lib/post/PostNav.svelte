<script lang="ts">
    import { onMount } from "svelte";
    import { Router, Link } from "svelte-routing";
    import { Post, postStore } from "./PostStore";

    let findText: string = "Find file: ";
    let find: HTMLSpanElement;

    $: postCount = (Post.selectedPost ? (Post.selectedPost?.index! + 1) : "*") + "/" + $postStore.length;

    const formatDate = (date: string) => {
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric",
            // hour: "numeric",
            // minute: "numeric",
        };

        return new Date(date).toLocaleString("en-GB", dateOptions).replace(",", "");
    };

    const togglePost = (post: Post)  => {
        const postIndex = $postStore.indexOf(post);
        if (Post.selectedPost?.index === postIndex) return Post.selectedPost = null;

        Post.selectedPost = post;
    };

    const onKeyDown = () => {

    }

    onMount(() => {
        if (window.matchMedia("(max-width: 480px)").matches) findText = "Find: ";
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="main">
    <Router>
        <div class="find-bar">
            <span class="post-count">{postCount}</span>
            <span style="margin-left: 20px; margin-right: 6px;">
                {findText}
            </span>
            <span style="color: #b0b2b1;">~/imre.al/</span>
            <span 
                class="find-path"
                bind:this={find}
                role="textbox"
                tabindex="0"
                contenteditable="true"
                on:keydown={onKeyDown}
            >
                test
                    <!-- ~/imre.al/{Post.selectedPost ? Post.selectedPost?.path.replace("/post/", "") + ".md" : ""} -->
            </span>
        </div>
    
        {#each $postStore as post, i}
            <div 
                class="post-row"
                class:selected={Post.selectedPost?.index === i}
                on:click={() => {
                    togglePost(post);
                    $postStore = $postStore;
                }}
            >
                <Link to={post.path}>
                    <span class="post-title">{post.path.replace("/post/", "") + ".md"}</span>
                    <span class="post-perms">
                        <span style="color: #7d9db7;">d</span>
                        <span style="color: #f0c674;">r</span>
                        <span style="color: #cc6666;">w</span>
                        <span style="color: #a5ad60;">x</span>
                        <span style="color: #f0c674;">r</span>
                        <span style="color: #5c5e5e;">-</span>
                        <span style="color: #a5ad60;">x</span>
                        <span style="color: #f0c674;">r</span>
                        <span style="color: #5c5e5e;">-</span>
                        <span style="color: #a5ad60;">x</span>
                    </span>
    
                    <span class="post-cat">
                        <!-- <Link to="/post/cat/{post.meta.category}">{post.meta.category}</Link> -->
                        {post.meta.category}
                    </span>
    
                    <span><time class="post-date" datetime={post.meta.date}>{formatDate(post.meta.date)}</time></span>
                </Link>
            </div>
        {/each}
    </Router>
</div>

<style>
    .main {
        background-color: #1d1f21;
    }

    .selected {
        background-color: #333537;
    }

    .post-row {
        display: flex;
        width: 100%;
        height: 22px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        white-space: nowrap;
    }

    .post-row :global(a) {
        display: flex;
        width: 100%;
        max-width: calc(100% - 12px);
        height: 22px;
        padding: 0 6px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .post-title {
        width: 30%;
        color: #b0b2b1;
    }

    .post-perms {
        display: flex;
        width: 20%;
    }
    
    .post-cat {
        width: 5%;
        color: #a88cb1;
    }

    .post-date, .post-cat :global(a) {
        color: #a88cb1;
    }

    time {
        color: #aeaeae;
    }

    .find-bar {
        display: flex;
        align-items: center;
        overflow: hidden;
        height: 22px;
        padding: 0 6px;
        color: #81a2be;
        white-space: nowrap;
    }

    .find-path {
        color: #c0c3c1;
    }

    /* :global(a) affects <Link> */
    :global(a) {
        color: #78b0d3;
        text-decoration: none;
    }

    :global(a):hover {
        text-decoration: none;
    }

    :global(a):visited {
        color: #db538e;
    }
</style>
