import { writable, get } from "svelte/store";
import { Options, Position } from "$lib/window/WindowStore";

import Terminal from "$lib/Terminal.svelte";
import Emacs from "$lib/Emacs.svelte";

interface ProgramOptions {
    name: string,
    slot: any,
    options?: Partial<Options>,
    position?: Partial<Position>
}

export class Program {
    name: string;
    slot: any;
    options: Options;
    position: Position;

    static store = writable<Program[]>([]);

    // constructor(name: string, component: any, options?: Partial<Options>) {
    constructor({ name, slot, options, position }: ProgramOptions) {
        this.options = new Options();
        Object.assign(this.options, options);

        this.slot = slot;
        this.name = name;

        this.position = new Position(position?.topPercent || 50, position?.leftPercent || 50);

        Program.store.update((store) => {
            return [...store, this].sort((a, b) => a.name.localeCompare(b.name)); // sort alphabetically by name
        });
    }
}

const terminal = new Program({
    name: "terminal",
    slot: Terminal,
    options: {
        type: "terminal"
    },
    position: {
        topPercent: 50,
        leftPercent: 60
    }
});

const emacs = new Program({
    name: "imre.al",
    slot: Emacs,
    options: {
        type: "emacs"
    }
});

// const about = new Program({
//     name: "about",
//     slot: null,
//     options: {
//         type: "about"
//     }
// });

export const programStore = Program.store; 
