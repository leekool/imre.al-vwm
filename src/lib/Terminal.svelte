<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { windowStore, Window } from "$lib/window/WindowStore";
    import _ from "lodash";

    let input: HTMLSpanElement;

    let directory = "~";
    let inputCommands: any[] = [];

    // these will need their own file to pull from
    const commands: {
        name: string;
        run: (input?: string, windowList?: Window[]) => void;
        input?: string;
        output?: string;
        validArgs?: () => string[];
        valid?: boolean;
    }[] = [
        {
            name: "clear",
            run: () => (inputCommands.length = 0),
        },
        {
            name: "shutdown",
            run: () => goto("/shutdown"),
        },
        {
            name: "echo",
            run: function (input) {
                this.output = input;
            },
        },
        {
            name: "kill",
            run: function (input) {
                if (!input || !this.validArgs) {
                    this.valid = false;
                    return (this.output = "kill: not enough arguments");
                }

                if (
                    !this.validArgs().some((window: unknown) => window == input)
                )
                    return (this.output = `kill: cannot find process "${input}"`);

                $windowStore.filter((window) => window.name == input)[0].kill();
            },

            validArgs: () => $windowStore.map((window) => window.name),
        },
        {
            name: "pwd",
            run: function () {
                this.output = "/home/you";
            },
        },
    ];

    const validCommand = (input: string): boolean => {
        const arrInput = input.split(" ");
        const command = arrInput[0];
        const args = arrInput.length > 1 ? arrInput.slice(1).join(" ") : "";

        for (let x of commands) {
            if (command !== x.name) continue;
            if (
                arrInput.length <= 1 ||
                !x.validArgs ||
                x.validArgs().includes(args)
            )
                return true;
        }

        return false;
    };

    const handleCommand = (command: string, commandArgs: string) => {
        for (let x of commands) {
            if (command !== x.name) continue;

            x.valid = validCommand(`${command} ${commandArgs}`);
            x.input = commandArgs;
            x.run(x.input, $windowStore);

            inputCommands.push(_.cloneDeep(x));
            inputCommands = inputCommands; // trigger change detection

            x.output = "";
        }
    };

    // get last command entered
    const lastCommand = (input: HTMLSpanElement): void => {
        if (!inputCommands) return;
        input.focus();

        input.textContent = inputCommands[inputCommands.length - 1].name;
    }

    const onEnter = (input: HTMLSpanElement) => {
        // prevent contenteditable adding <div> on chrome
        document.execCommand("insertLineBreak");
        event?.preventDefault();

        // remove <br> created by contenteditable
        while (input.children.length) input.children[0].remove();

        if (!input.textContent) return;

        // possibly refactor into object for handleCommand()
        const command = input.textContent.split(" ")[0].trim();
        const commandArgs = input.textContent.split(" ").slice(1).join(" ");

        /* checks if command exists - cannot use validCommand() as it
           returns false if command exists but it's arguments are invalid */
        if (!commands.some((x) => x.name === command)) {
            inputCommands.push({
                name: command,
                input: commandArgs,
                valid: false,
            });
            inputCommands = inputCommands; // trigger change detection

            input.textContent = "";
            return;
        }

        handleCommand(command, commandArgs);

        input.textContent = "";
    };

    const onKeyDown = (e: KeyboardEvent) => {
        // move cursor to end
        document.execCommand("selectAll", false);
        document.getSelection()?.collapseToEnd();

        switch (e.key) {
            case "Enter":
                onEnter(input);
                break;
            case "ArrowUp":
                lastCommand(input);
                break;
        }
    };

    onMount(() => {
        if (!Window.isMobile) input.focus();

        for (let window of $windowStore) {
            if (window.options.type === "terminal") {
                window.options.focusEle = input;
            }
        }

        // commands to open/focus each window
        $windowStore.forEach(window => {
            commands.push({
                name: window.name,
                run: () => {
                    window.getFocus();
                    $windowStore = $windowStore;
                }
            });
        });
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="main" on:click={() => input.focus()}>
    <div class="body">
        <div class="cli-line-container">
            {#each inputCommands as command}
                <div class="cli-line">
                    <span
                        class:ri-terminal-arrow={command.valid}
                        class:ri-terminal-x={!command.valid}
                    />
                    <span class="command">{command.name}</span>
                    <span
                        class="command"
                        style="color: #c2999c; white-space: pre"
                    >
                        {" " + command.input}
                    </span>
                </div>

                {#if !command.run}
                    <div class="cli-line command output" style="color: #efefe7">
                        {command.name}: command not found
                    </div>
                {/if}

                {#if command.output}
                    <div class="cli-line command output">
                        {command.output}
                    </div>
                {/if}
            {/each}
        </div>

        <div class="cli-line">
            <span class="ri-terminal-arrow" />
            <span
                bind:this={input}
                class="input command"
                role="textbox"
                spellcheck="false"
                tabindex="0"
                contenteditable="true"
                on:keydown={onKeyDown}
            />
            <span class="caret" />
        </div>
    </div>
</div>

<style>
    @import url("/fonts/real-icons.css");

    .main {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        padding: 10px 12px;
        background-color: rgba(40, 40, 40, 0.9) !important;
    }

    .body {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        position: relative;
        -ms-overflow-style: none; /* ie & edge */
        scrollbar-width: none; /* firefox */
        overflow: hidden;
    }

    .cli-line-container {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .cli-line-container::-webkit-scrollbar {
        display: none;
    }

    .cli-line {
        display: flex;
        align-items: center;
        width: 0;
        min-width: 100%;
        font-size: 15px;
        white-space: nowrap;
    }

    .directory {
        margin-top: 3px;
        padding-right: 8px;
        color: #c2999c;
    }

    .ri-terminal-arrow,
    .ri-terminal-x {
        display: flex;
        padding: 0 6px 0 1px;
        color: #928796;
        font-size: 10px;
    }

    .ri-terminal-x {
        color: #a2676b;
    }

    .command {
        max-height: 20px;
        margin-top: 3px;
        color: #a7b4a9;
    }

    .input {
        word-break: normal;
        overflow: hidden;
        background: transparent;
        border: none;
        outline: none;
        caret-color: transparent;
        -webkit-line-clamp: 1;
    }

    .output {
        color: #efefe7;
    }

    .caret {
        margin: 0 2px;
        height: 14px;
        width: 7px;
        background-color: #efefe7;
    }
</style>
