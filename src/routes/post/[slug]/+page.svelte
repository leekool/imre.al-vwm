<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { Post, postStore } from "$lib/post/PostStore";
    import { Window } from "$lib/window/WindowStore";

    import Desktop from "$lib/Desktop.svelte";
    import WindowComp from "$lib/window/Window.svelte";
    import Taskbar from "$lib/Taskbar.svelte";
    import Emacs from "$lib/Emacs.svelte";

    // get selectedPost
    const pathPost = $postStore.find(post => `/post/${post.path}/` === $page.url.pathname) ?? null;

    Post.selectedPost = pathPost;
    $postStore = $postStore; // trigger change detection
    // -----

    onMount(() => {
        Window.isMobile = (window.innerWidth <= 600 && window.innerHeight <= 800); 
    });
</script>

<svelte:head>
    <title>imre.al</title>
</svelte:head>

<Desktop />

<WindowComp 
    name="imre.al" 
    slot={Emacs} 
    options={{
        maximised: true,
    }}
/>

<Taskbar />

<style>

</style>
