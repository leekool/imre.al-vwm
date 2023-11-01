import { Post } from "$lib/post/PostStore";

export const prerender = true;

export async function load() {
    const postList = import.meta.glob("./post/*.md");

    for (const item in postList) {
        const post = await import(item);
        Post.createPost(post);
    }
}
