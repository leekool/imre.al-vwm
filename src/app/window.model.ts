export class Window {
    title: string = '';
    highlight: boolean = false;
    desktopIcon: string = '';

    constructor(title: string) {
        this.title = title;
        this.setDesktopIcon();
    }

    setDesktopIcon() {
        this.desktopIcon = this.highlight
            ? `assets/icons/${this.title}-desktop-icon-highlight.png`
            : `assets/icons/${this.title}-desktop-icon.png`;
    }

    toggleHighlight() {
        this.highlight = !this.highlight;
        this.setDesktopIcon();
    }
}
