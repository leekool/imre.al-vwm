import { redirect } from "@sveltejs/kit";

export const prerender = true;

export async function load({ params }: any) {
    try {
        const post = await import(`../${params.slug}.md`);
        const title = post.metadata?.title ?? "";
        const date = post.metadata?.date ?? "";
        const content = post.default ?? "";
        const category = post.metadata?.category ?? "";

        return { content, title, date, category };
    } catch (e) {
        throw redirect(307, "/");
    }
}
