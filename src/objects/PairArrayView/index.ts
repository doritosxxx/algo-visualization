import * as d3 from "d3";
import { Pair } from "../../algorithm/class";
import { character } from "../../algorithm/types";
import "./style.css";

export default class PairArrayView {
    public readonly container: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private pairs: Pair<character>[] = [];
    private indices: number[] = [];

    public constructor() {
        this.container = d3.create("div").attr("class", "pair-array-view");
    }

    public getPairs(): Pair<character>[] {
        return [...this.pairs];
    }

    public setPairs(pairs: Pair<character>[]) {
        this.setData(pairs, this.indices);
    }

    public setIndices(indices: number[]) {
        this.setData(this.pairs, indices);
    }

    public setData(pairs: Pair<character>[], indices: number[]) {
        this.pairs = [...pairs];
        this.indices = [...indices];
        const indicesString = this.indices.map((e) => "" + e);
        while (indicesString.length < this.pairs.length) indicesString.push("");

        const boxes = this.container
            .selectChildren(".pair-box")
            .data(this.pairs)
            .join(
                (enter) => {
                    const boxes = enter.append("div").classed("pair-box", true);
                    boxes.append("div").classed("pair--values", true);
                    boxes.append("div").classed("pair--index", true);
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

        boxes
            .data(indicesString)
            .select(".pair--index")
            .join(
                (enter) => enter,
                (update) => update,
                (exit) => exit.remove()
            )
            .text((index) => index)
            .style("transition", "none")
            .classed("folded", true)
            .call((item) => {
                setTimeout(function () {
                    item.style("transition", "top var(--frame-length), opacity var(--frame-length)").classed(
                        "folded",
                        false
                    );
                }, 0);
            });
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

    public drawLines(offsets: number[]) {
        function getColor(index) {
            const colors = ["#FFA9E7", "#7F2CCB", "#058ED9", "#2A2D43", "#FCE762", "#7FD1B9", "#EF2917", "#337357"];
            return colors[index % colors.length];
        }

        this.container
            .selectAll(".pair-box")
            .data(offsets)
            .append("svg")
            .each(function (index, i) {
                const offset = index - i;
                const parent = this.parentNode as HTMLElement;
                const styles = window.getComputedStyle(parent);
                const width = parseInt(styles.width) + parseInt(styles.marginLeft) + parseInt(styles.marginRight);

                this.setAttribute("width", width * 2 * Math.abs(offset) + 2 + "");
                this.setAttribute("height", "4em");

                const line = `<line x1="50%" y1="100%" x2="${
                    offset == 0 ? 50 : offset < 0 ? 0 : 100
                }%" y2="0%" stroke="${getColor(index)}" stroke-width="2"/>`;

                this.innerHTML = line;
            });
    }

    public removeLines() {
        this.container.selectAll(".pair-box svg").remove();
    }
}
