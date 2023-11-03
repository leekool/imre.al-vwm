import { Post } from "$lib/post/PostStore";

export const prerender = true;

const fetchPosts = async () => {
    const allPostFiles = import.meta.glob("./post/*.md");
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

    return allPosts;
};

export async function load() {
    const posts = await fetchPosts();

    posts.forEach(post => new Post(post));
}
