import * as d3 from "d3";
import { HierarchyPointLink, HierarchyPointNode } from "d3";
import { Edge, Leaf, Root } from "../../algorithm/class";
import { character } from "../../algorithm/types";
import "./style.css";

const config = {
    svg_width: 400,
    svg_height: 400,
    node_radius: 10,
};

export default class TreeView {
    private width: number = config.svg_width;
    private height: number = config.svg_height;

    public container: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    public tree: Root<character>;

    public constructor() {
        this.container = d3
            .create("svg")
            .classed("tree-view", true)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("fill", "none")
            .attr("stroke", "black");

        const padding = this.container.append("g").attr("transform", `translate(0 ${config.node_radius})`);

        padding.append("g").classed("links", true);
        padding.append("g").classed("nodes", true);
    }

    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.container
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", `0 0 ${this.width} ${this.height}`);
    }

    public setData(tree: Root<character>) {
        this.tree = tree;

        const layout = d3.tree<Edge<character>>().size([this.width, this.height - config.node_radius * 5])(
            d3.hierarchy(tree, (node) => node.children)
        );

        const linksContainer = this.container
            .select(".links")
            .selectChildren("g")
            .data(layout.links(), (d, i) => {
                const datum = d as HierarchyPointLink<Edge<character>>;
                return datum.target.data.id;
            })
            .join(
                (enter) => {
                    const groups = enter.append("g");
                    // Links.
                    groups.append("path");
                    // Labels.
                    const labels = groups.append("g").classed("link-label", true);
                    labels.append("rect").attr("fill", "white");
                    labels.append("text").attr("fill", "black");
                    return groups.style("opacity", "0").transition().duration(400).style("opacity", "1");
                },
                (update) => {
                    return update;
                },
                (exit) => exit.style("opacity", "1").transition().duration(400).style("opacity", "0").remove()
            );

        // Links.
        linksContainer
            .selectChild("path")
            .transition()
            .duration(400)
            .attr("d", (d) =>
                d3
                    .linkHorizontal()
                    .source((d) => [d.source[0], d.source[1]])
                    .target((d) => [d.target[0], d.target[1]])({
                    source: [d.source.x, d.source.y],
                    target: [d.target.x, d.target.y],
                })
            );

        // Labels.
        const labels = linksContainer.selectChild(".link-label").attr("transform", (d) => {
            const x = (d.source.x + d.target.x) / 2;
            const y = (d.source.y + d.target.y) / 2;
            return `translate(${x} ${y})`;
        });

        labels
            .select("text")
            .text((d) => d.target.data.label.join(""))
            .each(function () {
                const node = this as SVGTextElement;
                const boundBox = node.getBBox();
                const parent = node.parentElement;

                node.setAttribute("transform", `translate(${-boundBox.width / 2} ${boundBox.height / 2})`);

                const padding = 2;
                const rect = parent.querySelector("rect");
                rect.setAttribute("width", boundBox.width + 2 * padding + "");
                rect.setAttribute("height", boundBox.height + 2 * padding + "");
                rect.setAttribute("transform", `translate(${-boundBox.width / 2 - padding} ${-4 * padding})`);
            });

        const nodesContainer = this.container
            .select(".nodes")
            .selectChildren("g")
            .data(layout.descendants(), function (d) {
                const datum = d as HierarchyPointNode<Edge<character>>;
                return datum.data.id;
            })
            .join(
                (enter) => {
                    const groups = enter.append("g");

                    // Cricles.
                    groups
                        .append("circle")
                        .classed("node", true)
                        .attr("r", config.node_radius)
                        .attr("cx", (d) => d.x)
                        .attr("cy", (d) => d.y);

                    // Leaf Labels.
                    groups.append("text").classed("leaf-label", true).attr("fill", "black");
                    return groups.style("opacity", "0").transition().duration(400).style("opacity", "1");
                },
                (update) => {
                    update
                        .selectChild("circle")
                        .transition()
                        .duration(400)
                        .attr("cx", (d) => d.x)
                        .attr("cy", (d) => d.y);
                    return update;
                },
                (exit) => exit.style("opacity", "1").transition().duration(400).style("opacity", "0").remove()
            );

        nodesContainer
            .selectChild("text")
            .each(function (datum) {
                const node = this as SVGTextElement;

                node.classList.remove("odd");
                node.classList.remove("even");
                if (datum.data.type != null) {
                    node.classList.add(datum.data.type);
                }
            })
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y + 3 * config.node_radius)
            .text((d) => (d.data instanceof Leaf ? d.data.suffixIndex : ""))
            .each(function () {
                const node = this as SVGTextElement;
                const boundBox = node.getBBox();
                node.setAttribute("transform", `translate(${-boundBox.width / 2} 0)`);
            });
    }
}
