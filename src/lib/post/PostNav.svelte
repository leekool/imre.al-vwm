<script lang="ts">
    import { onMount, type ComponentType } from "svelte";
    import { Router, Link, Route } from "svelte-routing";
    import { postStore } from "./PostStore";

    const getLongDate = (date: string) => {
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric",
        };

        return new Date(date).toLocaleString("en-GB", dateOptions);
    };

    let data: { posts: any[] } = { posts: [] };

    const getPost = (title: string): ComponentType => {
        const post = $postStore.find(post => post.meta.title === title);
        return post?.content;
    }

    const loadPosts = async () => {
        const response = await fetch("/api/posts");
        const posts = await response.json();

        return { posts };
    };

    onMount(async () => {
        data = await loadPosts();
    });

    let currentPost: ComponentType;
    let path = "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="main" class="content">
    <div class="posts">
        <ul>
            <Router>
            {#each data.posts as post}
                <li>
                    <time datetime={post.meta.date}>{getLongDate(post.meta.date)}</time>
                    <span 
                        on:click={() => {
                            path = location.pathname;
                            currentPost = getPost(post.meta.title);
                        }}
                    >
                        <Link to={post.path}>{post.meta.title}</Link>        
                    </span>

                    <span class="tags">
                        <Link to="/post/cat/{post.meta.category}">{post.meta.category}</Link>
                    </span>
                </li>
            {/each}
            <Route path={path} component={currentPost} />
            </Router>
        </ul>
    </div>
</div>

<style>
    #main {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    time {
        color: #aeaeae;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none
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
