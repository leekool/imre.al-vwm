import { Post } from "$lib/post/PostStore";
import { redirect } from "@sveltejs/kit";

export const prerender = true;

export async function load({ params }: any) {
    try {
        const post = await import(`../${params.slug}.md`);
        const title = post.metadata?.title ?? "";
        const date = post.metadata?.date ?? "";
        const content = post.default ?? "";
        const category = post.metadata?.category ?? "";

        Post.createPost(post);
        return { content, title, date, category };

        // throw redirect(307, "/");
    } catch (e) {
        throw redirect(307, "/");
    }
}
