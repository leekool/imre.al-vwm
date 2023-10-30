import { writable, get } from "svelte/store";

let count: number = 0;

export class Position {
    height = 0;
    width = 0;
    top = 0;
    left = 0;
    topPercent = 50;
    leftPercent = 50;

    constructor(top: number, left: number) {
        this.topPercent = top;
        this.leftPercent = left;
    }
}

export class Options {
    focused = true;
    minimised = false;
    maximised = false;
    highlight = false;
    type = "window-emacs";
    navbar = {
        maximise: true,
        minimise: true,
        close: true,
        info: false
    }
    focusEle: HTMLElement | null = null;
}

export class Window {
    name: string;
    icon: string;
    id: number;
    component: any;
    position: Position;
    options: Options;
    zIndex: number = 0;

    static windowStore = writable<Window[]>([]);
    static focusList: number[] = [];

    constructor(name: string, component: any, options?: Partial<Options>, position?: Partial<Position>) {
        Window.windowStore.update((store) => [...store, this]);

        this.options = new Options();
        Object.assign(this.options, options);

        this.component = component;
        this.name = name;
        this.icon = "icons/" + name + "-icon-small.png";

        this.position = new Position(position?.topPercent || 50, position?.leftPercent || 50);

        this.id = count; // simple ID system for now
        count++

        this.getFocus();
    }

    toggleMinimise(): void {
        this.options.minimised = !this.options.minimised;

        if (this.options.minimised) {
            const index = Window.focusList.indexOf(this.id);
            Window.focusList.splice(index, 1);
        }

        this.options.minimised ? this.dropFocus() : this.getFocus();
    }

    toggleMaximise(): void {
        this.options.maximised = !this.options.maximised;
    }

    taskbarClk(): void {
        !this.options.focused && !this.options.minimised
            ? this.getFocus()
            : this.toggleMinimise();
    }

    // focuses target window and unfocuses all other windows
    getFocus(): void {
        console.log("TEST", this)
        const store = get(Window.windowStore);

        this.options.focused = true;

        // focus element
        if (this.options.focusEle) this.options.focusEle.focus();

        // update focusList
        const index = Window.focusList.indexOf(this.id);
        if (index !== -1) Window.focusList.splice(index, 1);
        Window.focusList.unshift(this.id);

        // drop focus of other windows
        for (let window of store) {
            if (this.id !== window.id) window.dropFocus(false);
        }
    }

    // unfocuses target window and focuses next unminimised window (if any)
    dropFocus(focusNext = true): void {
        const store = get(Window.windowStore);

        this.options.focused = false;

        Window.updateZIndex();

        if (!focusNext) return;

        // focus next window
        const index = store.findIndex(w => w.id === Window.focusList[0]);
        if (index !== -1) store[index].getFocus();
    }

    static updateZIndex(): void {
        const store = get(Window.windowStore);

        for (let window of store) {
            const index = Window.focusList.indexOf(window.id);
            if (index === -1) continue;

            window.zIndex = 10 + -index;
        }
    }

    kill() {
        const index = Window.focusList.indexOf(this.id);
        Window.focusList.splice(index, 1);

        Window.windowStore.update((store) => {
            const index = store.findIndex(w => w.id === this.id);

            store[index].dropFocus(); // focus next window
            store = store.filter(w => w.id !== this.id); // remove window from store

            return store;
        });

        this.component.$destroy(); // remove window from DOM
    }
}

// export const windowStore = writable<Window[]>([]);
export const windowStore = Window.windowStore;
