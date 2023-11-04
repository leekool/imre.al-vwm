<script lang="ts">
    import type { ComponentType } from "svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { Post, postStore } from "./PostStore";

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

    // const togglePost = (title: string): void => {
    //     const post = $postStore.find((post) => post.meta.title === title);
    //     if (post) selectedPostIndex = $postStore.indexOf(post);
    //
    //     selectedPost = post?.content;
    // };

    const togglePost = (post: Post): void => {
        const postIndex = $postStore.indexOf(post);

        if (selectedPostIndex === postIndex) {
            selectedPostIndex = null;
            selectedPost = (undefined as unknown) as ComponentType;
            path = "";
        } else {
            selectedPostIndex = postIndex;
            selectedPost = post.content;
            path = post.path.replace("/post/", "") + ".md";
        }
    };

    let selectedPost: ComponentType;
    let selectedPostIndex: number | null = null;
    let path = "";

    let postCount = $postStore.length;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Router>
    <div class="find-bar">
        <span class="post-count">{selectedPostIndex !== null ? selectedPostIndex + 1 : "*"}/{postCount}</span>
        <span style="padding-left: 10px;">
            Find file: <span class="find-path">~/imre.al/{path}</span>
        </span>
    </div>

    {#each $postStore as post, i}
        <div 
            class="post-row"
            class:selected={selectedPostIndex === i}
            on:click={() => togglePost(post)}
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
     
    <Route component={selectedPost} />
</Router>

<style>
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
        height: 22px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .post-title {
        width: 30%;
    }

    .post-title :global(a) {
        color: #b0b2b1;
    }

    .post-perms {
        display: flex;
        width: 20%;
    }
    
    .post-cat {
        width: 5%;
    }

    .post-date, .post-cat :global(a) {
        color: #a88cb1;
    }

    time {
        color: #aeaeae;
    }

    .find-bar {
        height: 22px;
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
