import * as d3 from "d3";

interface Model {
    array: number[];
}

interface View {}

export default class ViewState {
    private list = d3.select("#frame > * > svg").append("g").attr("transform", "translate(100, 100)");

    update() {

        this.list
            .selectAll("circle")
            .data(this.model.array)
            .join(
                (enter) =>
                    enter
                        .append("circle")
                        .attr("r", 30)
                        .attr("fill", "lightblue")
                        .attr("cx", 100)
                        .attr("cy", (d) => d * 100)
                        .text((d) => d),
                (update) => update,
                (exit) => exit.remove()
            );
    }

    public model: Model = {
        array: null,
    };

    public view: View;

    /*
    public toString(): string {
        return `{
			string: ${this.model.string}
		}`;
    }
*/
    public constructor(array: number[]) {
        this.model.array = array;

        this.update();

        //.enter().append("circle").attr("r", 10);
    }
}
