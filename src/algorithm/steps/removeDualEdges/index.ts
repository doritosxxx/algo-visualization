import { addTransition } from "../../../controller";
import HideOddEvenTreesTransition from "../../../transitions/HideOddEvenTreesTransition";
import RemoveDualEdgeTransition from "../../../transitions/RemoveDualEdgeTransition";
import { Root } from "../../class";
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

export default function removeDualEdges<T extends character>(merged: Root<T>, dualEdges: dualEdge<T>[]): Root<T> {
    addTransition(new HideOddEvenTreesTransition());

    for (const edgePair of dualEdges) {
		console.log(edgePair)
        const prefixLength = getCommonPrefixLength(edgePair.edge.label, edgePair.target.label);
        if (prefixLength == edgePair.edge.label.length) {
            edgePair.target["dual"] = undefined;
            addTransition(
                new RemoveDualEdgeTransition(merged, edgePair.edge.label.join(""), edgePair.target.label.join(""))
            );
        } else {
            // Create new Edge;
        }
    }
}
