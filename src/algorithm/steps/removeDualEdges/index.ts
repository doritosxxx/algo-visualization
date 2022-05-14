import { addTransition } from "../../../controller";
import ConvertMergedToSuffixTree from "../../../transitions/ConvertMergedToSuffixTree";
import HideOddEvenTreesTransition from "../../../transitions/HideOddEvenTreesTransition";
import RemoveDualEdgeTransition from "../../../transitions/RemoveDualEdgeTransition";
import SplitDualEdgeTransition from "../../../transitions/SplitDualEdgeTransition";
import { Edge, Leaf, Root } from "../../class";
import { character, dualEdge } from "../../types";

function getCommonPrefixLength<T>(first: T[], second: T[]) {
    let i = 0;
    while (i < first.length && i < second.length) {
        if (first[i] != second[i]) {
            return i;
        }
        ++i;
    }
    return i;
}

function cleanup<T extends character>(merged: Root<T>) {
    compress(merged);
    merged.setSubtreeColor(null);
    addTransition(new ConvertMergedToSuffixTree(merged));
}

export default function removeDualEdges<T extends character>(merged: Root<T>, dualEdges: dualEdge<T>[]) {
    addTransition(new HideOddEvenTreesTransition());

    for (const edgePair of dualEdges) {
        const prefixLength = getCommonPrefixLength(edgePair.edge.label, edgePair.target.label);
        edgePair.target["dual"] = undefined;
        if (prefixLength == edgePair.edge.label.length) {
            addTransition(
                new RemoveDualEdgeTransition(merged, edgePair.edge.label.join(""), edgePair.target.label.join(""))
            );
        } else {
            const oldLabels = [edgePair.target, edgePair.edge].map((e) => e.label.join("")) as [string, string];
            const commonPrefix = edgePair.edge.label.slice(0, prefixLength);
            const evenPrefix = edgePair.edge.label.slice(prefixLength);
            const oddPrefix = edgePair.target.label.slice(prefixLength);

            const evenChild = new Edge<T>(evenPrefix);
            evenChild.type = "even";
            evenChild.children = edgePair.target.children.filter((child) => child.type == "even");

            const oddChild = new Edge<T>(oddPrefix);
            oddChild.type = "odd";
            oddChild.children = edgePair.target.children.filter((child) => child.type == "odd");

            edgePair.target.label = commonPrefix;
            edgePair.target.children = evenPrefix[0] < oddPrefix[0] ? [evenChild, oddChild] : [oddChild, evenChild];
            addTransition(
                new SplitDualEdgeTransition(
                    merged,
                    ...oldLabels,
                    commonPrefix.join(""),
                    evenPrefix.join(""),
                    oddPrefix.join("")
                )
            );
        }
    }

    cleanup(merged);
}

function compress<T extends character>(node: Edge<T>) {
    if (node instanceof Leaf) {
        return;
    }

    if (!(node instanceof Root))
        while (node.children.length == 1 && !(node.children[0] instanceof Leaf)) {
            const child = node.children[0];
            node.label.push(...child.label);
            node.children = child.children;
        }

    for (const child of node.children) {
        compress(child);
    }
}
