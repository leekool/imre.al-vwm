import { Post } from "$lib/post/PostStore";
import { redirect } from "@sveltejs/kit";

export const prerender = true;

const fetchPosts = async () => {
    const allPostFiles = import.meta.glob("../*.md");
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const data: any = await resolver();

            return {
                meta: data.metadata,
                content: data.default,
                path: path.replace("../", "").replace(".md", "")
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
        return { slug: post.path };
    });
}

export async function load() {
    try {
        const posts = await fetchPosts();
        posts.forEach(post => new Post(post));
    } catch {
        throw redirect(307, "/");
    }
}
