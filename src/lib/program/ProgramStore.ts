import { writable, get } from "svelte/store";
import { Options } from "$lib/window/WindowStore";

import Terminal from "$lib/Terminal.svelte";

export class Program {
    name: string;
    component: any;
    options: Options;

    static store = writable<Program[]>([]);

    constructor(name: string, component: any, options?: Partial<Options>) {
        this.options = new Options();
        Object.assign(this.options, options);

        this.component = component;
        this.name = name;

        Program.store.update((store) => {
            const programExists = store.some(item => item.name === this.name);
            return programExists ? store : [...store, this];
        });
    }
}

const terminal = {
    options: {
        type: "terminal",
        minimised: true,
        focused: false
    },
    component: Terminal
}
