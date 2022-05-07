import * as d3 from "d3";
import "./tooltip.css";

export default class Tooltip {
    private container: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    public constructor() {
        this.container = d3.create("div").classed("tooltip", true).classed("hidden", true);
        document.querySelector("body").appendChild(this.container.node());
        this.hide();
    }

    public show() {
        this.container.classed("hidden", false);
    }

    public hide() {
        this.container.classed("hidden", true);
    }

    public setPosition(x: number, y: number) {
        this.container.style("left", x + "px").style("top", y + "px");
    }

    public setText(text: string) {
        this.container.text(text);
    }

    public clear() {
        this.setText("");
        this.hide();
    }
}
