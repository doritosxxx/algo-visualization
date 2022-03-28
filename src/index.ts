import { farach } from "./algorithm/functions";
import { Edge, Root } from "./algorithm/class";
import * as d3 from "d3";

type T = Edge<number>;

document.addEventListener("DOMContentLoaded", function () {
    const tree = getTree();

    getUpdateFunction(tree);

    const width = 1000;
    const height = 600;

    const layout = d3.tree<Edge<number>>().size([width, height])(d3.hierarchy(tree, (node) => node.edges));

    const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

    const edges = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .selectAll("path")
        .data(layout.links())
        .enter()
        .append("path")
        .attr("d", (d) =>
            d3.linkVertical()({
                source: [d.source.x, d.source.y],
                target: [d.target.x, d.target.y],
            })
        );

    const nodes = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .selectAll("circle")
        .data(layout.descendants())
        .enter()
        .append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 10)
        .style("fill", "green");

    const labels = svg
        .append("g")
        .attr("text-anchor", "middle")
        .selectAll("g")
        .data(layout.links())
        .enter()
        .append("g");

    labels
        .append("text")
        .attr("x", (d) => d.source.x / 2 + d.target.x / 2)
        .attr("y", (d) => d.source.y / 2 + d.target.y / 2)
        .text((d) => d.source.data.letters[d.source.children.findIndex((e) => e == d.target)]);
});

function getTree(): Root<number> {
    const tree = new Root<number>();

    const nested = new Edge([6, 7]);
    nested.edges = [new Edge([]), new Edge([])];

    tree.edges.push(...[nested, new Edge([]), new Edge([])]);
    tree.letters.push(...[1, 4, 6]);

    return tree;
}

function getUpdateFunction(root: Edge<number>) {
    function update() {
        root.edges.push(new Edge<number>([]))
        root.letters.push(1)
		return root.edges.length;
    }
    console.log(update);
}
