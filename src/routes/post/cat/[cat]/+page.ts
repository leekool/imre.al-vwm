import type { Load } from "@sveltejs/kit";

export const prerender = true;

export const load: Load = async ({ fetch, params }) => {
    const { category } = params;
    const response = await fetch("/api/posts");
    const allPosts = await response.json();

    const posts = allPosts
        .filter((post: any) => post.meta.category.includes(category));

    return { category, posts };
}
