import * as d3 from "d3";
import { Edge, Leaf, Root } from "../../algorithm/class";
import { character } from "../../algorithm/types";
import "./style.css";

const config = {
    svg_width: 400,
    svg_height: 400,
    node_radius: 10,
};

export default class TreeView {
    public container: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    public tree: Root<character>;

    public constructor() {
        this.container = d3
            .create("svg")
            .classed("tree-view", true)
            .attr("width", config.svg_width)
            .attr("height", config.svg_height)
            .attr("viewBox", `0 0 ${config.svg_width} ${config.svg_height}`)
            .attr("fill", "none")
            .attr("stroke", "black");

        const padding = this.container.append("g").attr("transform", `translate(0 ${config.node_radius})`);

        padding.append("g").classed("links", true);
        padding.append("g").classed("nodes", true);
    }

    public setData(tree: Root<character>) {
        const layout = d3.tree<Edge<character>>().size([config.svg_width, config.svg_height - config.node_radius * 5])(
            d3.hierarchy(tree, (node) => node.children)
        );

        const linksContainer = this.container
            .select(".links")
            .selectChildren("g")
            .data(layout.links())
            .enter()
            .append("g");

        linksContainer.append("path").attr("d", (d) =>
            d3.linkVertical()({
                source: [d.source.x, d.source.y],
                target: [d.target.x, d.target.y],
            })
        );

        const labels = linksContainer
            .append("g")
            .classed(".link-label", true)
            .attr("transform", (d) => {
                const x = (d.source.x + d.target.x) / 2;
                const y = (d.source.y + d.target.y) / 2;
                return `translate(${x} ${y})`;
            });

        labels.append("rect").attr("fill", "white");

        labels
            .append("text")
            .text((d) => d.target.data.label.join(""))
            .attr("fill", "black")
            .each(function () {
                const boundBox = this.getBBox();
                const parent = this.parentElement;

                //this.setAttribute("transform", `0 ${boundBox.height})`)

                this.setAttribute("transform", `translate(${-boundBox.width / 2} ${boundBox.height / 2})`);

                const padding = 2;
                const rect = parent.querySelector("rect");
                rect.setAttribute("width", boundBox.width + 2 * padding + "");
                rect.setAttribute("height", boundBox.height + 2 * padding + "");
                rect.setAttribute("transform", `translate(${-boundBox.width / 2 - padding} ${-4*padding})`);
            });

        const nodesContainer = this.container
            .select(".nodes")
            .selectChildren("g")
            .data(layout.descendants())
            .enter()
            .append("g");

        nodesContainer
            .append("circle")
            .classed("node", true)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", config.node_radius);

        nodesContainer
            .append("text")
            .classed("leaf-label", true)
            .each(function (datum) {
                if (datum.data.type != null) {
                    this.classList.add(datum.data.type);
                }
            })
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y + 3 * config.node_radius)
            .attr("fill", "black")
            .text((d) => (d.data instanceof Leaf ? d.data.suffixIndex : ""))
            .each(function () {
                const boundBox = this.getBBox();
                this.setAttribute("transform", `translate(${-boundBox.width / 2} 0)`);
            });
    }
}
