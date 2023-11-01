<script lang="ts">
    import { onMount } from "svelte";
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

    let data: any = { posts: [] };

    const findPost = (title: string) => {
        const post = $postStore.find(post => post.meta.title === title);
        return post?.content ?? null;
    }

    const loadPosts = async () => {
        const response = await fetch("/api/posts");
        const posts = await response.json();

        return { posts };
    };

    onMount(async () => {
        data = await loadPosts();
    });

    $: $postStore, console.log($postStore)

    let currentPost: any = null;
    let path = "";
</script>

<!-- <div id="main" class="content"> -->
<!--     <div class="posts"> -->
<!--         <ul> -->
<!--             {#each data.posts as post} -->
<!--                 <li> -->
<!--                     <time datetime={post.meta.date}>{getLongDate(post.meta.date)}</time> -->
<!--                     <a class="clean-link" href={post.path}>{post.meta.title}</a> -->
<!--                     <span class="tags"> -->
<!--                         <a class="tag" href="/post/category/{post.meta.category}"> -->
<!--                             {post.meta.category} -->
<!--                         </a> -->
<!--                     </span> -->
<!--                 </li> -->
<!--             {/each} -->
<!--         </ul> -->
<!--     </div> -->
<!-- </div> -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Router>
    {#each data.posts as post}
        <div on:click={async () => {
            path = location.pathname;
            currentPost = findPost(post.meta.title);
        }}>
            <Link to={post.path}>{post.meta.title}</Link>        
        </div>
    {/each}

    <main>
        <Route path={path} component={currentPost} />
        you are {path}

    </main>
</Router>

<style>
    #main {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .content {
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
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

    .tags {
        font-family: "Berkeley Mono", monospace;
        font-size: 0.8rem;
        color: #5c6166;
    }

    .tags .tag {
        text-decoration: none;
        color: inherit;
    }

    .tags .tag:hover {
        text-decoration: underline;
    }

    .tags .tag:visited {
        color: inherit;
    }
</style>
