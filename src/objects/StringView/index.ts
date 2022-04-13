import IDOMRepresentable from "../IDOMRepresentable";
import IVisualizable from "../IVisualizable";

export default class StringView implements IDOMRepresentable, IVisualizable {
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

        console.log(this);
    }

    update() {
        this.domElement.textContent = this.string;
    }
}
