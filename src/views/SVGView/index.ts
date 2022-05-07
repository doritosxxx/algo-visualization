import * as d3 from "d3";

export default class SVGView {
    private container: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
    public width: number;
    public height: number;

    private viewBox: [number, number, number, number] = [0, 0, 0, 0];

    private getViewBox() {
        return this.viewBox.join(" ");
    }

    public constructor() {
        this.container = d3.select("#svg");
    }

    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.container.attr("width", width);
        this.container.attr("height", height);
        this.viewBox[2] = width;
        this.viewBox[3] = height;
        this.updateViewBox();
    }

    private updateViewBox() {
        this.container.transition().duration(400).attr("viewBox", this.getViewBox());
    }

    public setViewBox(x: number, y: number, width: number, height: number) {
        this.viewBox = [x, y, width, height];
        this.updateViewBox();
    }

    public centerBoundBox(x: number, y: number, width: number, height: number) {
        this.viewBox[0] = x + width / 2 - this.width / 2;
        this.viewBox[1] = y + height / 2 - this.height / 2;

        this.updateViewBox();
    }
}
