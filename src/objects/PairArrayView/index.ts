import * as d3 from "d3";
import { Pair } from "../../algorithm/class";
import { character } from "../../algorithm/types";
import "./style.css";

export default class PairArrayView {
    public readonly container: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private pairs: Pair<character>[];

    public constructor() {
        this.container = d3.create("div").attr("class", "pair-array-view");
    }

    public getPairs(): Pair<character>[] {
        return [...this.pairs];
    }

    public setPairs(pairs: Pair<character>[]) {
        this.pairs = [...pairs];
        const boxes = this.container
            .selectChildren(".pair-box")
            .data(this.pairs)
            .join(
                (enter) => {
                    const boxes = enter.append("div").classed("pair-box", true);
                    boxes.append("div").classed("pair--values", true);
                    return boxes;
                },
                (update) => update,
                (exit) => exit.remove()
            );

        // Append pairs data.
        boxes
            .select(".pair--values")
            .selectChildren("span")
            .data((pair) => ["", pair.first, "", pair.second, ""])
            .join(
                (enter) => enter.append("span"),
                (update) => update,
                (exit) => exit.remove()
            )
            .text((d) => d ?? "$");
    }

    public showAsArray() {
        this.container.classed("pairs-as-array", true);
    }

    public showAsPairArray() {
        this.container.classed("pairs-as-array", false);
    }

    public highlightFirstElement() {
        this.container.classed("highlight-first-element", true);
    }

    public hideFirstElement() {
        this.container.classed("highlight-first-element", false);
    }

    public highlightSecondElement() {
        this.container.classed("highlight-second-element", true);
    }

    public hideSecondElement() {
        this.container.classed("highlight-second-element", false);
    }

    public highlightPairsWithBorder(indices: number[]) {
        const nodes = this.container.selectAll(".pair-box").nodes() as HTMLElement[];

        const bordered = indices.filter((index) => index >= 0 && index < nodes.length).map((index) => nodes[index]);
        bordered.forEach((node) => node.classList.add("red-border"));
    }

    public hideBorder() {
        this.container.selectAll(".pair-box").classed("red-border", false);
    }

    /**
     * Redorders elements in array with corresponding animation.
     * @param order New index order of existing elements.
     */
    public reorder(order: number[]) {
        // For each element in array.
        const offsets: number[] = new Array(this.pairs.length);
        const nodes = this.container.selectChildren("div").nodes() as HTMLElement[];

        // Count offsets.
        for (let i = 0; i < order.length; ++i) {
            const new_index = order[i];
            offsets[i] = nodes[i].offsetLeft - nodes[new_index].offsetLeft;
        }

        // Create new nodes order.
        const reordered = order.map((new_index) => nodes[new_index]);
        // Move each element with corresponding offset.
        nodes.forEach((node, i) => {
            if (i != order[i]) {
                node.classList.add("moveable");
                reordered[i].style.setProperty("left", -offsets[i] + "px");
            }
        });

        // Remove all elements and insert them in new order.
        this.container.selectChildren("div").remove();
        for (const child of reordered) {
            this.container.node().appendChild(child);
        }

        // Schedule cleanup after animation end.
        this.container.selectChildren("div").on("transitionend", function () {
            (this as HTMLElement).classList.remove("moveable");
        });

        // Trigger animation.
        setTimeout(() => nodes.forEach((node) => node.style.removeProperty("left")), 0);
    }

    /**
     * Removes elements with transiton that match any index.
     * @param indices Unique indices to remove.
     */
    public remove(indices: number[]) {
        const nodes = this.container.selectChildren().nodes() as HTMLElement[];

        const remove = indices.map((index) => nodes[index]);
        // Set animation.
        for (const node of remove) {
            node.addEventListener("transitionend", function () {
                this.classList.remove("removeable");
                node.remove();
            });
            node.style.width = node.offsetWidth + "px";
            node.classList.add("removeable");
        }

        // Start animation.
        setTimeout(
            () =>
                remove.forEach((node) => {
                    node.style.width = "0";
                    node.style.margin = "0";
                }),
            0
        );
    }

    /**
     * Removes elements with transiton that does not match any index.
     * @param indices Unique indices to keep.
     */
    public keep(indices: number[]) {
        this.remove(this.reverseNodesIndexSet(indices));
    }

    private reverseNodesIndexSet(indices: number[]): number[] {
        const n = this.container.selectChildren().nodes().length;
        const used = new Array(n).fill(false);
        indices.filter((index) => index >= 0 && index < n).forEach((index) => (used[index] = true));

        const result = [];
        for (let i = 0; i < used.length; ++i) {
            if (!used[i]) {
                result.push(i);
            }
        }
        return result;
    }
}
