import { json } from "@sveltejs/kit";

export const prerender = true;

const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob("/src/routes/post/*.md");
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata }: any = await resolver();
            const postPath = path.slice(11, -3); // remove "/src/routes"

            return { meta: metadata, path: postPath };
        })
    );

    return allPosts;
}

export const GET = async () => {
    const allPosts = await fetchMarkdownPosts();

    // sort posts by date
    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return json(sortedPosts);
}
