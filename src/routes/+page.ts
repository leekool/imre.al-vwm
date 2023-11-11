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

    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return sortedPosts;
};

export async function load() {
    const posts = await fetchPosts();

    posts.forEach(post => new Post(post));
}
