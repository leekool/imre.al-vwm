import { json } from "@sveltejs/kit";

export const prerender = true;

const fetchPosts = async () => {
    const allPostFiles = import.meta.glob("/src/routes/post/*.md");
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const data: any = await resolver();

            return {
                meta: data.metadata,
                path: path.slice(11, -3) // remove "/src/routes"
            };
        })
    );

    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return sortedPosts;
};

export const GET = async () => {
    const allPosts = await fetchPosts();

    return json(allPosts);
}
