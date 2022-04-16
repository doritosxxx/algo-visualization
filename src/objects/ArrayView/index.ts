import * as d3 from "d3";
import "./PairArray.css";

type arrayElement = string;

export default class ArrayView {
    private _array: arrayElement[] = [];

    public selection: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    public elementsSelection: d3.Selection<d3.BaseType, string, HTMLDivElement, undefined>;

    public update() {
        this.elements
            .data(this._array)
            .join(
                (enter) => enter.append("div").text((d) => d),
                (update) => update.text(d => d),
                (exit) => exit.remove()
            );
    }

    public set array(array: arrayElement[]) {
        this._array = array;
        this.update();
    }

    public get array() {
        return this._array;
    }

    public get elements() {
        return this.selection.selectAll("div");
    }

    public constructor(array: arrayElement[]) {
        this.selection = d3.create("div").attr("class", "array-view");
        this._array = array;
    }
}
