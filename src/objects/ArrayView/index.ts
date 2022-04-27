import * as d3 from "d3";
import "./ArrayView.css";

type arrayElement = string;

export default class ArrayView {
    private _array: arrayElement[] = [];

    public selection: d3.Selection<HTMLDivElement, string, null, undefined>;
    //public elementsSelection: d3.Selection<d3.BaseType, string, HTMLDivElement, undefined>;

    public update() {
        return this.elements;
    }

    public set array(array: arrayElement[]) {
        this._array = array;
        this.elements.data(this._array);
    }

	public data(array: arrayElement[]) : d3.Selection<d3.BaseType, string, HTMLDivElement, undefined>{
		this._array = array;
		return this.elements.data(array);
	}

    public get array() {
        return this._array;
    }

    public get elements(): d3.Selection<d3.BaseType, string, HTMLDivElement, undefined> {
        return this.selection.selectAll("div");
    }

    public constructor() {
        this.selection = d3.create("div").attr("class", "array-view");
    }
}
