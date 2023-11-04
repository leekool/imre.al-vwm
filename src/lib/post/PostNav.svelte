<script lang="ts">
    import type { ComponentType } from "svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { postStore } from "./PostStore";

    const getLongDate = (date: string) => {
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        };

        return new Date(date).toLocaleString("en-GB", dateOptions).replace(",", "");
    };

    const getPost = (title: string): ComponentType => {
        const post = $postStore.find((post) => post.meta.title === title);
        if (post) postIndex = $postStore.indexOf(post) + 1;

        return post?.content;
    };

    let currentPost: ComponentType;
    let path = "";

    let postCount = $postStore.length;
    let postIndex = 1;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Router>
    <div class="find-bar">
        <span class="post-count">{postIndex}/{postCount}</span>
        <span style="padding-left: 10px;">
            Find file: <span class="find-path">~/imre.al/{path}</span>
        </span>
    </div>
    <div class="posts">
        <ul>
            {#each $postStore as post}
                <li class="post-list-item">
                    <span
                        on:click={() => {
                            path = post.path.replace("/post/", "") + ".md";
                            currentPost = getPost(post.meta.title);
                        }}
                    >
                        <Link to={post.path}>{post.path.replace("/post/", "") + ".md"}</Link>
                    </span>

                    <time datetime={post.meta.date}>{getLongDate(post.meta.date)}</time>

                    <span class="tags">
                        <Link to="/post/cat/{post.meta.category}">{post.meta.category}</Link>
                    </span>
                </li>
            {/each}
        </ul>
    </div>
     
    <Route component={currentPost} />
</Router>

<style>
    time {
        color: #aeaeae;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .find-bar {
        color: #81a2be;
    }

    .find-path {
        color: #c0c3c1;
    }

    .post-list-item:hover {
        background-color: #333537;
    }

    /* :global(a) affects <Link> */
    :global(a) {
        color: #78b0d3;
        text-decoration: none;
    }

    :global(a):hover {
        text-decoration: underline;
    }

    :global(a):visited {
        color: #db538e;
    }

    .content {
        /* max-width: 900px; */
        margin-left: auto;
        margin-right: auto;
        /* padding-left: 1rem; */
        /* padding-right: 1rem; */
    }

    .posts {
        line-height: 1.5;
    }

    .posts li time {
        margin-right: 0.5rem;
        font-family: "Berkeley Mono", monospace;
        font-size: 0.8rem;
    }

    .posts li .tags {
        float: right;
        margin-left: 0.5rem;
    }

    .tags :global(a) {
        color: #5c6166;
        font-family: "Berkeley Mono", monospace;
        font-size: 0.8rem;
        text-decoration: none;
    }
</style>
