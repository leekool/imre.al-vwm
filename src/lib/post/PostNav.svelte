<script lang="ts">
    import { onMount } from "svelte";
    import { Router, Link } from "svelte-routing";
    import { Post, postStore } from "./PostStore";
    import { windowStore } from "$lib/window/WindowStore";
    import { goto } from "$app/navigation";

    let findText: string = "Find file: ";
    let inputEl: HTMLSpanElement;
    let filteredPosts: Post[] = [];

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

        if (Post.selectedPost?.index === postIndex) {
            window.history.replaceState(history.state, "", "/");
            return Post.selectedPost = null;
        }

        inputEl.textContent = post.path.replace("/post/", "") + ".md";
        window.history.replaceState(history.state, "", post.path);
        Post.selectedPost = post;
    };

    const onEnter = () => {
        // prevent contenteditable adding <div> on chrome
        document.execCommand("insertLineBreak");
        event?.preventDefault();

        // remove <br> created by contenteditable
        while (inputEl.children.length) inputEl.children[0].remove();

        // select post
        if (filteredPosts.length > 0) {
            const post = $postStore.find((post) => post.meta.title === filteredPosts[0].meta.title)!;
            togglePost(post);
        } else {
            togglePost($postStore[0]);
        }

        $postStore = $postStore;
    }

    const handleKey = (event: KeyboardEvent) => {
        // move cursor to end
        document.execCommand("selectAll", false);
        document.getSelection()?.collapseToEnd();

        if (event.key === "Enter") return onEnter();
        if (!inputEl.textContent) return filteredPosts = [];

        const input = inputEl.textContent;

        filteredPosts = $postStore.filter((post) => (post.path.replace("/post/", "") + ".md").toLowerCase().match(input));
    }

    onMount(() => {
        if (window.matchMedia("(max-width: 480px)").matches) findText = "Find: ";

        inputEl.focus();

        const emacs = $windowStore.find(window => window.options.type === "emacs");
        if (emacs) emacs.options.focusEle = inputEl;
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="main">
    <Router>
        <div 
            class="find-bar"
            on:click={() => inputEl.focus()}
        >
            <span class="post-count">{postCount}</span>
            <span style="margin-left: 20px; margin-right: 6px;">
                {findText}
            </span>
            <span style="color: #b0b2b1;">~/imre.al/</span>
            <span 
                class="find-path"
                bind:this={inputEl}
                role="textbox"
                spellcheck="false"
                tabindex="0"
                contenteditable="true"
                on:keyup={handleKey}
            >
            </span>
            <span class="caret" />
        </div>
    
        <div class="post-row-container">
            {#if filteredPosts.length > 0}
                {#each filteredPosts as post}
                    <div 
                        class="post-row"
                        class:selected={Post.selectedPost?.index === post.index}
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
            {:else}
                {#each $postStore as post}
                    <div 
                        class="post-row"
                        class:selected={Post.selectedPost?.index === post.index}
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
            {/if}
        </div>
    </Router>
</div>

<style>
    .main {
        background-color: #1d1f21;
    }

    .selected {
        background-color: #333537;
    }

    .post-row-container {
        display: flex;
        flex-direction: column;
        height: 44px;
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
        max-height: 22px;
        padding: 0 6px;
        color: #81a2be;
        white-space: nowrap;
    }

    .find-path {
        color: #c0c0c0;
        word-break: normal;
        background: transparent;
        overflow: hidden;
        border: none;
        outline: none;
        caret-color: transparent;
        -webkit-line-clamp: 1;
    }

    .caret {
        margin: 0 0 2px 2px;
        height: 13px;
        width: 7px;
        background-color: #c0c0c0;
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
