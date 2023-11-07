import { writable, get } from "svelte/store";

export class Post {
    meta: {
        title: string;
        date: string;
        category: string;
    };
    content: any;
    path: string;
    index: number;

    static store = writable<Post[]>([]);
    static selectedPost: Post | null = null;

    constructor(post: any) {
        this.meta = post.meta;
        this.content = post.content ?? null;
        this.path = post.path;

        Post.store.update((store) => {
            // assuming no posts have the same title
            const postExists = store.some(post => post.meta.title === this.meta.title);
            return postExists ? store : [...store, this];
        });

        this.index = get(Post.store).indexOf(this);
    }
}

export const postStore = Post.store;
