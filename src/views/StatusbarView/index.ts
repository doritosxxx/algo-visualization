export default class StatusbarView {
    public container: HTMLDivElement;

    public constructor() {
        this.container = document.querySelector("#statusbar");
    }

    public setString(string: string) {
        this.container.textContent = string;
    }

    public clear() {
        this.container.textContent = "";
    }
}
