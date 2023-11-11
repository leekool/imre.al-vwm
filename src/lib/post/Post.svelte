<script lang="ts">
    import { Post, postStore } from "$lib/post/PostStore";

    $: $postStore, Post.selectedPost = Post.selectedPost;
</script>

    <article>
        <div class="title">{Post.selectedPost?.meta.title ?? ""}</div>
        <div class="article-metadata">
            <time datetime={Post.selectedPost?.meta.date}>{Post.selectedPost?.meta.date ?? ""}</time>
            <span class="tags">
                <a class="tag" href="/">{Post.selectedPost?.meta.category ?? ""}</a>
            </span>
        </div>

        <div class="article-content">
            <svelte:component this={Post.selectedPost?.content} />
        </div>
    </article>

<style>
    .content {
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .article-metadata {
        display: flex;
        justify-content: space-between;
    }

    .article-content {
        margin-top: 2rem;
    }

    .article-content ul,
    .article-content ol {
        list-style-position: inside;
        list-style-type: "– ";
    }

    .article-content ul > li:not(:first-of-type),
    .article-content ol > li:not(:first-of-type) {
        margin-top: 0.25rem;
    }

    .article-content ul > li > ul,
    .article-content ol > li > ul {
        margin-left: 1rem;
    }

    .title {
        margin-bottom: 1rem;
        font-weight: 900;
    }

    .tags {
        /* font-family: "Berkeley Mono", monospace; */
        /* font-size: 0.8rem; */
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
