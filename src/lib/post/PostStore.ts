import { writable, get } from "svelte/store";

export class Post {
    meta: {
        title: string;
        date: string;
        category: string;
    };
    // path: string;
    content: any;

    static store = writable<Post[]>([]);

    constructor(post: any) {
        this.meta = {
            title: post.metadata?.title ?? "",
            date: post.metadata?.date ?? "",
            category: post.metadata?.category ?? "",
        };
        // this.path = "test";
        this.content = post.default ?? null;
        
        Post.store.update((store) => {
            // this assumes two posts will never have the same title
            const postExists = store.some(post => post.meta.title === this.meta.title);
            return postExists ? store : [...store, this];
        });
    }

    static createPost(post: any) {
       const newPost = new Post(post); 
    }
}

export const postStore = Post.store;
