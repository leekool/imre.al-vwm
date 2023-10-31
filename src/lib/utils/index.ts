export const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob("/src/routes/post/*.md");
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata }: any = await resolver();
            const postPath = path.slice(11, -3); // remove '/src/routes'

            return {
                meta: metadata,
                path: postPath
            };
        })
    );

    console.log(allPosts)

    return allPosts;
}
