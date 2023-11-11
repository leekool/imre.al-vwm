import { Post } from "$lib/post/PostStore";
import { redirect } from "@sveltejs/kit";

// export async function load({ params }: any) {
//     try {
//         const post = await import(`../${params.slug}.md`);
//         const title = post.metadata?.title ?? "";
//         const date = post.metadata?.date ?? "";
//         const content = post.default ?? "";
//         const category = post.metadata?.category ?? "";
//
//         return { content, title, date, category };
//     } catch (e) {
//         throw redirect(307, "/");
//     }
// }

export const prerender = true;

const fetchPosts = async () => {
    const allPostFiles = import.meta.glob("../../post/*.md");
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const data: any = await resolver();

            return {
                meta: data.metadata,
                content: data.default,
                path: path.replace(".", "").replace(".md", ""),
            };
        })
    );

    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return sortedPosts;
};

export async function entries() {
    const posts = await fetchPosts();

    return posts.map(post => {
        return { slug: post.meta.path + ".md" };
    });
}

export async function load() {
    const posts = await fetchPosts();

    posts.forEach(post => new Post(post));
}
