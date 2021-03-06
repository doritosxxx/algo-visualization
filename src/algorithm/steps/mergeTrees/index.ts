import { addTransition } from "../../../controller";
import { ShowMergedTreeTransition } from "../../../transitions";
import AppendSubtreeTransition from "../../../transitions/AppendSubtreeTransition";
import PaintTreesTransition from "../../../transitions/PaintTreesTransition";
import PullEdgeToMergedTreeTransition from "../../../transitions/PullEdgeToMergedTreeTransition";
import SplitEdgeTransition from "../../../transitions/SplitEdgeTransition";
import { Edge, Root } from "../../class";
import { character, dualEdge } from "../../types";

export default function mergeTrees<T extends character>(even: Root<T>, odd: Root<T>): [Root<T>, dualEdge<T>[]] {
    even.setSubtreeColor("even");
    odd.setSubtreeColor("odd");

    addTransition(new PaintTreesTransition());
    addTransition(new ShowMergedTreeTransition());

    const merged = new Root<T>();
    const dualEdges = [];
    mergeSubtrees(even, odd, merged, dualEdges, even, odd, merged);
    return [merged, dualEdges];
}

/**
 *
 * @param even Even subtree
 * @param odd Odd subtree
 * @param merged Empty node that will contain merged nodes edges.
 */
function mergeSubtrees<T extends character>(
    even: Edge<T>,
    odd: Edge<T>,
    merged: Edge<T>,
    dualEdges: dualEdge<T>[],
    evenRoot: Edge<T>,
    oddRoot: Edge<T>,
    mergedRoot: Edge<T>
) {
    let even_index = 0;
    let odd_index = 0;

    // While there are something to compare.
    while (even_index < even.children.length && odd_index < odd.children.length) {
        const even_child = even.children[even_index];
        const odd_child = odd.children[odd_index];

        // If leaf is found we cant compare edges labels.
        if (even_child.label.length == 0 || odd_child.label.length == 0) {
            break;
        }

        // Case 1. First letters are not equal.
        if (even_child.label[0] != odd_child.label[0]) {
            // Determine node with least letter and insert it into merged tree.
            if (even_child.label[0] < odd_child.label[0]) {
                merged.children.push(even_child.clone(false));
                even_index++;
                addTransition(new AppendSubtreeTransition(mergedRoot, "even", getDescendantsIds(even_child)));
            } else {
                merged.children.push(odd_child.clone(false));
                odd_index++;
                addTransition(new AppendSubtreeTransition(mergedRoot, "odd", getDescendantsIds(odd_child)));
            }
        }
        // First letters are equal.
        else {
            // Break longer edge.
            if (even_child.label.length < odd_child.label.length) {
                const label = odd_child.label.join("");
                breakEdge(odd_child, even_child.label.length);
                addTransition(new SplitEdgeTransition(oddRoot, "odd", label, even_child.label.length));
            } else if (even_child.label.length > odd_child.label.length) {
                const label = even_child.label.join("");
                breakEdge(even_child, odd_child.label.length);
                addTransition(new SplitEdgeTransition(evenRoot, "even", label, odd_child.label.length));
            }

            // Now we have edges with same label length.
            const pushed = even_child.cloneType();
            pushed.type = even_child.type;
            pushed["dual"] = odd_child;
            merged.children.push(pushed);
            const dualEdge = {
                target: pushed,
                edge: odd_child,
            };
            dualEdges.push(dualEdge);
            addTransition(new PullEdgeToMergedTreeTransition(mergedRoot, pushed.id, even_child, odd_child));
            mergeSubtrees(even_child, odd_child, pushed, dualEdges, evenRoot, oddRoot, mergedRoot);
            odd_index++;
            even_index++;
        }
    }

    // Append remaining subtrees without merging.
    while (even_index < even.children.length) {
        const child = even.children[even_index++];
        merged.children.push(child.clone(false));
        addTransition(new AppendSubtreeTransition(mergedRoot, "even", getDescendantsIds(child)));
    }
    while (odd_index < odd.children.length) {
        const child = odd.children[odd_index++];
        merged.children.push(child.clone(false));
        addTransition(new AppendSubtreeTransition(mergedRoot, "odd", getDescendantsIds(child)));
    }
}

function breakEdge<T extends character>(edge: Edge<T>, length: number) {
    const added = new Edge(edge.label.slice(length));
    added.children = edge.children;
    added.type = edge.type;

    edge.label = edge.label.slice(0, length);
    edge.children = [added];
}

function getDescendantsIds<T extends character>(edge: Edge<T>, ids: number[] = []): number[] {
    ids.push(edge.id);
    for (const child of edge.children) {
        getDescendantsIds(child, ids);
    }
    return ids;
}
