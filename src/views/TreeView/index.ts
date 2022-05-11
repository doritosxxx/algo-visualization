import * as d3 from "d3";
import { HierarchyPointLink, HierarchyPointNode } from "d3";
import { Edge, Leaf, Root } from "../../algorithm/class";
import { character, dualEdge } from "../../algorithm/types";
import * as state from "../../state";
import "./style.css";

const config = {
    svg_width: 400,
    svg_height: 400,
    node_radius: 10,
};

function setSubstringTooltip<T extends character>(node: Edge<T>) {
    if (!node) {
        return;
    }
    if (node instanceof Root) {
        node["tooltip"] = "";
    }

    for (const child of node.children) {
        child["tooltip"] = (node["tooltip"] ?? "") + child.label.join("");
        setSubstringTooltip(child);
    }
}

function getLinkPivotPoint(p1: [number, number], p2: [number, number]): [number, number] {
    const c = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    const cp1 = [p1[0] - c[0], p1[1] - c[1]];
    const v = [-cp1[1], cp1[0]];
    const point: [number, number] = [c[0] + v[0], c[1] + v[1]];
    return point;
}

function buildTriangleLinkPath(start: [number, number], end: [number, number]) {
    const pivot = getLinkPivotPoint(start, end);
    const path = `M ${start[0]} ${start[1]} L ${pivot[0]} ${pivot[1]} L ${end[0]} ${end[1]}`;
    return path;
}

export default class TreeView {
    private width: number = config.svg_width;
    private height: number = config.svg_height;

    public container: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    public tree: Root<character> = null;
    public dualEdges: dualEdge<character>[] = [];

    public constructor() {
        this.container = d3
            .create("svg")
            .classed("tree-view", true)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("fill", "none");

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
        setSubstringTooltip(this.tree);

        const layout = d3.tree<Edge<character>>().size([this.width, this.height - config.node_radius * 5])(
            d3.hierarchy(tree as Edge<character>, (node) => node?.children)
        );

        const linksContainer = this.container
            .select(".links")
            .selectChildren("g")
            .data(tree ? layout.links() : [], (d) => {
                const datum = d as HierarchyPointLink<Edge<character>>;
                return datum.target.data.id;
            })
            .join(
                (enter) => {
                    const groups = enter.append("g");
                    // Links.
                    groups.append("path").classed("link", true);
                    // Labels.
                    const labels = groups.append("g").classed("link-label", true);
                    labels.append("rect");
                    const texts = labels.append("text");
                    texts.append("tspan").attr("x", 0).attr("y", "0.9em");
                    texts.append("tspan").attr("x", 0).attr("y", "2.4em");
                    return groups.style("opacity", "0").transition().duration(400).style("opacity", "1");
                },
                (update) => {
                    return update;
                },
                (exit) => exit.style("opacity", "1").transition().duration(400).style("opacity", "0").remove()
            );

        // Links.
        const paths = linksContainer
            .selectChild("path")
            .attr("data-id", (d) => d.target.data.id)
            .transition()
            .duration(400)
            .attr("d", (d) =>
                d3
                    .linkVertical()
                    .source((d) => [d.source[0], d.source[1]])
                    .target((d) => [d.target[0], d.target[1]])({
                    // DON'T REMOVE +1. Straight path line becomes invisible when using linear gradient.
                    source: [d.source.x + 1, d.source.y],
                    target: [d.target.x, d.target.y],
                })
            )
            //.attr("d", (d) => buildTriangleLinkPath([d.source.x, d.source.y], [d.target.x, d.target.y]))
            .each(function (datum) {
                const link = this as SVGPathElement;

                link.classList.remove("odd");
                link.classList.remove("even");
                link.classList.remove("both");

                if (datum.target.data["dual"]) {
                    link.classList.add("both");
                } else if (datum.target.data.type != null) {
                    link.classList.add(datum.target.data.type);
                }
            });

        // Labels.
        const labels = linksContainer.selectChild(".link-label");

        labels
            .transition()
            .duration(400)
            .attr("transform", (d) => {
                const x = (d.source.x + d.target.x) / 2;
                const y = (d.source.y + d.target.y) / 2;
                return `translate(${x} ${y})`;
            });

        labels.select("tspan").text((d) => d.target.data.label.join(""));
        labels
            .selectAll("tspan:nth-child(2)")
            .text((d: HierarchyPointLink<Edge<character>>) =>
                d.target.data["dual"] ? d.target.data["dual"].label.join("") : null
            );

        labels.select("text").each(function () {
            const node = this as SVGTextElement;
            const boundBox = node.getBBox();
            const parent = node.parentElement;

            const padding = 2;
            node.setAttribute(
                "transform",
                `translate(${-boundBox.width / 2 - padding} ${-boundBox.height / 2 - padding})`
            );

            const rect = parent.querySelector("rect");
            rect.setAttribute("stroke", "black");
            rect.setAttribute("width", boundBox.width + 2 * padding + "");
            rect.setAttribute("height", boundBox.height + 2 * padding + "");

            rect.setAttribute(
                "transform",
                `translate(${-boundBox.width / 2 - padding} ${-boundBox.height / 2 - padding})`
            );
        });

        const nodesContainer = this.container
            .select(".nodes")
            .selectChildren("g")
            .data(tree ? layout.descendants() : [], function (d) {
                const datum = d as HierarchyPointNode<Edge<character>>;
                return datum.data.id;
            })
            .join(
                (enter) => {
                    const groups = enter.append("g");

                    // Circles.
                    groups
                        .append("circle")
                        .classed("node", true)
                        .attr("r", config.node_radius)
                        .attr("cx", (d) => d.x)
                        .attr("cy", (d) => d.y)
                        // Set tooltip.
                        .on("mouseover", () => state.get().tooltip.show())
                        .on("mousemove", function (event: MouseEvent, d) {
                            const tooltip = state.get().tooltip;
                            tooltip.setPosition(event.pageX, event.pageY);
                            tooltip.setText(
                                `${d.data instanceof Leaf ? "suffix" : "substring"}:"${d.data["tooltip"]}"`
                            );
                        })
                        .on("mouseout", () => state.get().tooltip.hide());

                    // Leaf Labels.
                    groups.append("text").classed("leaf-label", true);
                    return groups.style("opacity", "0").transition().duration(400).style("opacity", "1");
                },
                (update) => update,
                (exit) => exit.style("opacity", "1").transition().duration(400).style("opacity", "0").remove()
            )
            .each(function (datum) {
                const node = this as SVGTextElement;

                node.classList.remove("odd");
                node.classList.remove("even");
                if (datum.data.type != null) {
                    node.classList.add(datum.data.type);
                }
            });

        nodesContainer
            .selectChild("circle")
            .transition()
            .duration(400)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y);

        nodesContainer
            .selectChild("text")
            .text((d) => (d.data instanceof Leaf ? d.data.suffixIndex : ""))
            .each(function () {
                const node = this as SVGTextElement;
                const boundBox = node.getBBox();
                node.setAttribute("transform", `translate(${-boundBox.width / 2} 0)`);
            })
            .transition()
            .duration(400)
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y + 3 * config.node_radius);
    }

    public redraw() {
        this.setData(this.tree);
    }

    public setDualEdges(edges: dualEdge<character>[]) {
        this.dualEdges = edges;
    }
}
