import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'shutdown',
  templateUrl: './shutdown.component.html',
  styleUrls: ['./shutdown.component.css'],
})

export class ShutdownComponent implements AfterContentInit {
  commands: Command[] = [
    {text: 'Stopped target Remote File System.'},
    {text: 'Stopping Network Manager...', ok: false},
    {text: 'Stopping WPA supplicant...', ok: false},
    {text: 'Stopped User Runtime Directory /run/user/1000.'},
    {text: 'Removed slice User Slice of UID 1000.'},
    {text: 'Stopped Network Manager.'},
    {text: 'Stopped WPA supplicant.'},
    {text: 'Stopping D-Bus System Message Bus...', ok: false},
    {text: 'Stopped D-Bus System Message Bus.'},
    {text: 'Stopped target Basic System.'},
    {text: 'Stopped target Path Units.'},
    {text: 'Stopped target Slice Units.'},
    {text: 'Removed slice User and Session Slice.'},
    {text: 'Stopped target Socket Units.'},
    {text: 'Closed D-Bus System Message Bus Socket.'},
    {text: 'Stopped target System Initialization.'},
    {text: 'Unset automount Arbitrary Executable File Formats File System Automount Point.'},
    {text: 'Stopped target Local Encrypted Volumes.'},
    {text: 'Stopped Dispatch Password Requests to Console Directory Watch.'},
    {text: 'Stopped Forward Password Requests to Wall Directory Watch.'},
    {text: 'Stopped target Local Integrity Protected Volumes.'},
    {text: 'Stopped target Local Verity Protected Volumes.'},
    {text: 'Stopping Load/Save Screen Backlight Brightness of backlight:kool_backlight...', ok: false},
    {text: 'Stopping Load/Save Screen Backlight Brightness of leds:leather:kbd_backlight...', ok: false},
    {text: 'Stopped Apply Kernel Variables.'},
    {text: 'Stopped Load Kernel Modules.'},
    {text: 'Stopping Network Time Synchronization...', ok: false},
    {text: 'Stopping Record System Boot/Shutdown in UTMP...', ok: false},
    {text: 'Unmounted /run/credentials/systeml-sysctl.service.'},
    {text: 'Stopped Load/Save Screen Backlight Brightness of backlight:kool_backlight.'},
    {text: 'Stopped Network Time Synchronization.'},
    {text: 'Stopped Load/Save Screen Backlight Brightness of leds:leather:kbd_backlight.'},
    {text: 'Removed slice Slice /system/systeml-backlight.'},
    {text: 'Stopped Record System Boot/Shutdown in UTMP.'},
    {text: 'Stopped Create Volatile Files and Directories.'},
    {text: 'Stopped target Local File Systems.'},
    {text: 'Unmounting /boot/efi...', ok: false},
    {text: 'Unmounting /run/credentials/systeml-tmpfiles-setup.service...', ok: false},
    {text: 'Unmounting /run/credentials/systeml-tmpfiles-setup-dev.service...', ok: false},
    {text: 'Unmounting /run/media/lee/6430-6630...', ok: false},
    {text: 'Unmounting Temporary Directory /tmp...', ok: false},
    {text: 'Unmounted /boot/efi.'},
    {text: 'Unmounted /run/credentials/systeml-tmpfiles-setup.service.'},
    {text: 'Unmounted /run/credentials/systeml-tmpfiles-setup-dev.service.'},
    {text: 'Unmounted /run/media/lee/6430-6630.'},
    {text: 'Unmounted Temporary Directory /tmp.'},
    {text: 'Stopped target Swaps.'},
    {text: 'Deactivating swap /dev/disk/by-id/nvme-LEATHER512G_NVMe_KIOXIA_512GB_30OF71XO7HL-partB...', ok: false},
    {text: 'Stopped File System Check on /dev/disk/by-uuid-CE9A-709A.'},
    {text: 'Removed slice Slice /system/systeml-fsck.'},
    {text: 'Stopped target Preparation for Local File Systems.'},
    {text: 'Stopping Monitoring of LVM2 mirrors, snapshots etc, using dmeventd or progress polling...', ok: false},
    {text: 'Stopped Remount Root and Kernel File Systems.'},
    {text: 'Stopped Create Static Device Nodes in /dev.'},
    {text: 'Deactivated swap /dev/disk/by-partuuid/7353729d-7104-5afaaf85-5d52b2a7dacb.'},
    {text: 'Deactivated swap /dev/disk/by-path/pci-0000:57:00.0-nvme-1-partB.'},
    {text: 'Deactivated swap /dev/disk/by-id/nvme-LEATHER512G_NVMe_KIOXIA_512GB_30OF71XO7HL-partB.'},
    {text: 'Deactivated swap /dev/disk/by-id/nvme-eui.00000000000000010ce38e05002240000-partB.'},
    {text: 'Deactivated swap /dev/nvme0n1p0.'},
    {text: 'Deactivated swap /dev/disk/by-uuid/2f5510e5-23f8-43ed-b7a0-dd5b8a7e1c51.'},
    {text: 'Reached target Unmount All Filesystems.'},
    {text: 'Stopped Monitoring of LVM2 mirrors, snapshots etc. using dmeventd or progress polling.'},
    {text: 'Reached target System Shutdown.'},
    {text: 'Reached target Late System Services.'},
    {text: 'Finished System Power Off.'},
    {text: 'Reached target System Power Off.'},
  ];

  commandList: Command[] = [];

  @ViewChild('body') body: ElementRef;

  scrollToBottom(el: ElementRef) {
    el.nativeElement.scrollTop = el.nativeElement.scrollHeight - el.nativeElement.clientHeight;
  }

  constructor() {
    const commandList = new CommandList;
    commandList.newCommand(this.commands);
    this.commandList = commandList.getCommands();
  }

  async ngAfterContentInit() {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    for (let i = 0; i < this.commandList.length + 1; i++) {
      if (i == this.commandList.length) {
        await sleep(1000);
        this.commandList = [];
        break;
      }

      await sleep(100 - Math.log(i)*Math.log(i)*6);
      this.commandList[i].hidden = false;
      this.scrollToBottom(this.body);
    }
  }

}

// command/commandList
interface Command {
  text: string;
  ok?: boolean;
  hidden?: boolean;
}

class CommandList {
  commandList: Command[] = [];

  newCommand(array: Command[]): void {
    for (let x of array) {
      let command: Command = {
        text: x.text,
        ok: x.ok === undefined ? true : false,
        hidden: x.hidden === undefined ? true : false
      };
      this.commandList.push(command);
    }
  }

  getCommands() {
    return this.commandList;
  }
}
