<script lang="ts">
    import { onMount } from "svelte";

    interface Command {
        pre: string;
        item: string;
        end?: string;
        ok?: boolean;
        hidden?: boolean;
    }

    class CommandList {
        commandList: Command[] = [];

        newCommand(array: Command[]): void {
            for (let x of array) {
                let command: Command = {
                    pre: x.pre,
                    item: x.item,
                    end: x.ok === undefined ? "." : "...",
                    ok: x.ok === undefined ? true : false,
                    hidden: x.hidden === undefined ? true : false,
                };
                this.commandList.push(command);
            }
        }

        getCommands() {
            return this.commandList;
        }
    }
    const commands: Command[] = [
        {pre: 'Stopped target', item: 'Remote File System'},
        {pre: 'Stopping', item: 'Network Manager', ok: false},
        {pre: 'Stopping', item: 'WPA supplicant', ok: false},
        {pre: 'Stopped', item: 'User Runtime Directory /run/user/1000'},
        {pre: 'Removed slice', item: 'User Slice of UID 1000'},
        {pre: 'Stopped', item: 'Network Manager'},
        {pre: 'Stopped', item: 'WPA supplicant'},
        {pre: 'Stopping', item: 'D-Bus System Message Bus', ok: false},
        {pre: 'Stopped', item: 'D-Bus System Message Bus'},
        {pre: 'Stopped target', item: 'Basic System'},
        {pre: 'Stopped target', item: 'Path Units'},
        {pre: 'Stopped target', item: 'Slice Units'},
        {pre: 'Removed slice', item: 'User and Session Slice'},
        {pre: 'Stopped target', item: 'Socket Units'},
        {pre: 'Closed', item: 'D-Bus System Message Bus Socket'},
        {pre: 'Stopped target', item: 'System Initialization'},
        {pre: 'Unset automount', item: 'Arbitrary Executable File Formats File System Automount Point'},
        {pre: 'Stopped target', item: 'Local Encrypted Volumes'},
        {pre: 'Stopped', item: 'Dispatch Password Requests to Console Directory Watch'},
        {pre: 'Stopped', item: 'Forward Password Requests to Wall Directory Watch'},
        {pre: 'Stopped target', item: 'Local Integrity Protected Volumes'},
        {pre: 'Stopped target', item: 'Local Verity Protected Volumes'},
        {pre: 'Stopping', item: 'Load/Save Screen Backlight Brightness of backlight:kool_backlight', ok: false},
        {pre: 'Stopping', item: 'Load/Save Screen Backlight Brightness of leds:leather:kbd_backlight', ok: false},
        {pre: 'Stopped', item: 'Apply Kernel Variables'},
        {pre: 'Stopped', item: 'Load Kernel Modules'},
        {pre: 'Stopping', item: 'Network Time Synchronization', ok: false},
        {pre: 'Stopping', item: 'Record System Boot/Shutdown in UTMP', ok: false},
        {pre: 'Unmounted', item: '/run/credentials/systeml-sysctlservice'},
        {pre: 'Stopped', item: 'Load/Save Screen Backlight Brightness of backlight:kool_backlight'},
        {pre: 'Stopped', item: 'Network Time Synchronization'},
        {pre: 'Stopped', item: 'Load/Save Screen Backlight Brightness of leds:leather:kbd_backlight'},
        {pre: 'Removed slice', item: 'Slice /system/systeml-backlight'},
        {pre: 'Stopped', item: 'Record System Boot/Shutdown in UTMP'},
        {pre: 'Stopped', item: 'Create Volatile Files and Directories'},
        {pre: 'Stopped target', item: 'Local File Systems'},
        {pre: 'Unmounting', item: '/boot/efi', ok: false},
        {pre: 'Unmounting', item: '/run/credentials/systeml-tmpfiles-setupservice', ok: false},
        {pre: 'Unmounting', item: '/run/credentials/systeml-tmpfiles-setup-devservice', ok: false},
        {pre: 'Unmounting', item: '/run/media/lee/6430-6630', ok: false},
        {pre: 'Unmounting', item: 'Temporary Directory /tmp', ok: false},
        {pre: 'Unmounted', item: '/boot/efi'},
        {pre: 'Unmounted', item: '/run/credentials/systeml-tmpfiles-setupservice'},
        {pre: 'Unmounted', item: '/run/credentials/systeml-tmpfiles-setup-devservice'},
        {pre: 'Unmounted', item: '/run/media/lee/6430-6630'},
        {pre: 'Unmounted', item: 'Temporary Directory /tmp'},
        {pre: 'Stopped target', item: 'Swaps'},
        {pre: 'Deactivating', item: 'swap /dev/disk/by-id/nvme-LEATHER512G_NVMe_KIOXIA_512GB_30OF71XO7HL-partB', ok: false},
        {pre: 'Stopped', item: 'File System Check on /dev/disk/by-uuid-CE9A-709A'},
        {pre: 'Removed slice', item: 'Slice /system/systeml-fsck'},
        {pre: 'Stopped target', item: 'Preparation for Local File Systems'},
        {pre: 'Stopping', item: 'Monitoring of LVM2 mirrors, snapshots etc, using dmeventd or progress polling', ok: false},
        {pre: 'Stopped', item: 'Remount Root and Kernel File Systems'},
        {pre: 'Stopped', item: 'Create Static Device Nodes in /dev'},
        {pre: 'Deactivated', item: 'swap /dev/disk/by-partuuid/7353729d-7104-5afaaf85-5d52b2a7dacb'},
        {pre: 'Deactivated', item: 'swap /dev/disk/by-path/pci-0000:57:000-nvme-1-partB'},
        {pre: 'Deactivated', item: 'swap /dev/disk/by-id/nvme-LEATHER512G_NVMe_KIOXIA_512GB_30OF71XO7HL-partB'},
        {pre: 'Deactivated', item: 'swap /dev/disk/by-id/nvme-eui00000000000000010ce38e05002240000-partB'},
        {pre: 'Deactivated', item: 'swap /dev/nvme0n1p0'},
        {pre: 'Deactivated', item: 'swap /dev/disk/by-uuid/2f5510e5-23f8-43ed-b7a0-dd5b8a7e1c51'},
        {pre: 'Reached target', item: 'Unmount All Filesystems'},
        {pre: 'Stopped', item: 'Monitoring of LVM2 mirrors, snapshots etc using dmeventd or progress polling'},
        {pre: 'Reached target', item: 'System Shutdown'},
        {pre: 'Reached target', item: 'Late System Services'},
        {pre: 'Finished', item: 'System Power Off'},
        {pre: 'Reached target', item: 'System Power Off'},
    ];

    let commandList: any = [];
    let body: any;

    const scrollToBottom = (el: any) => {
        el.scrollTop = el.scrollHeight - el.clientHeight;
    };

    onMount(async () => {
        commandList = new CommandList();
        commandList.newCommand(commands);
        commandList = commandList.getCommands();

        console.log(commandList);

        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

        for (let i = 0; i < commandList.length + 1; i++) {
            if (i == commandList.length) {
                await sleep(1000);
                commandList = [];
                break;
            }

            await sleep(100 - Math.log(i) * Math.log(i) * 6);
            commandList[i].hidden = false;
            scrollToBottom(body);
        }
    });
</script>

<div bind:this={body} class="body">
    <div class="command-container">
        {#each commandList as command}
            <div class="command" class:show={!command.hidden}>
                <span class="ok">
                    {#if command.ok}
                        <span style="color: #fff">
                            <span style="margin-right: 18px">[</span><span
                                style="color: #4af626">OK</span
                            ><span style="margin-left: 18px">]</span>
                        </span>
                    {/if}
                </span>
                <span>{command.pre}</span><span style="color: #fff"
                    >{" " + command.item}</span
                ><span>{command.end}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    @font-face {
        font-family: "Terminus";
        src: url("/fonts/Terminus.woff") format("woff");
        font-weight: normal;
        font-style: normal;
    }

    .body {
        height: 100%;
        width: 100%;
        color: #fff;
        font-family: "Terminus";
        font-weight: 1000;
        position: absolute;
        background: #000;
        z-index: 10;
        overflow-x: hidden;
    }

    .command-container {
        padding: 10px 10px 0 10px;
    }

    .command {
        display: none;
        user-select: none;
        white-space: nowrap;
        color: #d6d6d6;
        font-size: 0;
    }

    .command span {
        font-size: 16px;
    }

    .show {
        display: block;
    }

    .ok {
        display: inline-block;
        min-width: 80px;
        padding-right: 5px;
        text-align: center;
    }
</style>
