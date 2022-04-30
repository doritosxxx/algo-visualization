import * as d3 from "d3";
import PairArrayView from "../PairArrayView";
import "./style.css";

function createDummyElement<T extends HTMLElement>(original: T): T {
    const dummy = document.createElement(original.tagName) as T;

    dummy.className = "dummy";

    return dummy;
}

function getElementsOffset(first: HTMLElement, second: HTMLElement) {
    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();

    return {
        top: firstRect.top - secondRect.top,
        left: firstRect.left - secondRect.left,
    };
}

export default class StackView {
    public container: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
    private stack: PairArrayView[] = [];

    constructor() {
        this.container = d3.select(".stack");
    }

    public clear() {
        this.container.selectChildren().remove();
        this.stack = [];
    }

    public push(array: PairArrayView) {
        this.extractAndPushArray(array);
        this.stack.push(array);
    }

    private extractAndPushArray(array: PairArrayView) {
        const node = array.container.node();
        const dummy = createDummyElement(node);
        this.container.append(() => dummy);
        const offset = getElementsOffset(node, dummy);

        dummy.style.transition = "height var(--frame-length)";
        dummy.style.height = "0px";

        node.classList.add("moveable-array");
        node.style.left = offset.left + "px";
        node.style.top = offset.top + "px";
        this.container.append(() => node);

        // Set cleanup function.
        dummy.addEventListener("transitionend", function () {
            node.classList.remove("moveable-array");
            dummy.remove();
        });

        // Trigger animation.
        setTimeout(() => {
            node.style.removeProperty("left");
            node.style.removeProperty("top");
            dummy.style.height = node.offsetHeight + "px";
        }, 0);

        this.container.append(() => node);
    }

    public pop(): PairArrayView {
        return this.stack.pop();
    }
}
