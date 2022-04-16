import IDOMRepresentable from "../IDOMRepresentable";

export default class StringView implements IDOMRepresentable {
    private string: string = "";
    domElement: HTMLElement;

    unmount() {
        this.domElement.remove();
    }

    public constructor(string: string) {
        this.string = string;
        this.domElement = document.createElement("div");
        this.domElement.classList.add("string-view");
        this.update();
    }

    update() {
        this.domElement.textContent = this.string;
    }
}
