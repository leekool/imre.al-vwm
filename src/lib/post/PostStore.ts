import type { ComponentType } from "svelte";
import { writable, get } from "svelte/store";

export class Post {
    meta: {
        title: string;
        date: string;
        category: string;
    };
    content: any;
    path: string;

    static store = writable<Post[]>([]);

    constructor(post: any) {
        this.meta = post.meta;
        this.content = post.content ?? null;
        this.path = post.path;

        Post.store.update((store) => {
            const postExists = store.some(post => post.meta.title === this.meta.title);
            return postExists ? store : [...store, this];
        });
    }
}

export const postStore = Post.store;
