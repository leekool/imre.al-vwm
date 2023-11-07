<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import { Post, postStore } from "./PostStore";

    $: $postStore, Post.selectedPost = Post.selectedPost;
</script>

<div class="body">
    <Router>
        <Route component={Post.selectedPost?.content} />
    </Router>
</div>

<style>

</style>
