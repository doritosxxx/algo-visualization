import { addTransition } from "../../../controller";
import { ShowMergedTreeTransition, UpdateTreeTransition } from "../../../transitions";
import PaintTreesTransition from "../../../transitions/PaintTreesTransition";
import UpdateMergedTreeTransition from "../../../transitions/UpdateMergedTreeTransition";
import { Edge, Root } from "../../class";
import { character } from "../../types";

type DualEdgesArray<T extends character> = {
    from: Edge<T>;
    edge: Edge<T>;
}[];

export default function mergeTrees<T extends character>(even: Root<T>, odd: Root<T>): Root<T> {
    even.setSubtreeColor("even");
    odd.setSubtreeColor("odd");

    addTransition(new PaintTreesTransition());
    addTransition(new ShowMergedTreeTransition());

    const merged = new Root<T>();
    mergeSubtrees(even, odd, merged, [], even, odd, merged);
    return merged;
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
    dualEdges: DualEdgesArray<T>,
    evenRoot: Edge<T>,
    oddRoot: Edge<T>,
    mergedRoot: Edge<T>
) {
    let even_index = 0;
    let odd_index = 0;

    // TODO: check if child has empty label (is a leaf)
    // While there are something to compare.
    while (even_index < even.children.length && odd_index < odd.children.length) {
        const even_child = even.children[even_index];
        const odd_child = odd.children[odd_index];

        // Case 1. First letters are not equal.
        if (even_child.label[0] != odd_child.label[0]) {
            // Determine node with least letter and insert it into merged tree.
            if (even_child.label[0] < odd_child.label[0]) {
                merged.children.push(even_child.clone());
                even_index++;
            } else {
                merged.children.push(odd_child.clone());
                odd_index++;
            }
        }
        // First letters are equal.
        else {
            // Break longer edge.
            if (even_child.label.length < odd_child.label.length) {
                breakEdge(odd_child, even_child.label.length);
                addTransition(new UpdateTreeTransition(oddRoot, "odd"));
            } else if (even_child.label.length > odd_child.label.length) {
                breakEdge(even_child, odd_child.label.length);
                addTransition(new UpdateTreeTransition(evenRoot, "even"));
            }
            // Now we have edges with same label length.
            // TODO: Break<>EdgeTransiton.

            const pushed = even_child.cloneType();
            pushed.type = even_child.type;
            merged.children.push(pushed);
            // TODO: Save dual edge.
            mergeSubtrees(even_child, odd_child, pushed, dualEdges, evenRoot, oddRoot, mergedRoot);
            addTransition(new UpdateTreeTransition(mergedRoot, "merged"));
            odd_index++;
            even_index++;
        }
    }

    while (even_index < even.children.length) {
        merged.children.push(even.children[even_index++].clone());
        addTransition(new UpdateTreeTransition(mergedRoot, "merged"));
    }

    while (odd_index < odd.children.length) {
        merged.children.push(odd.children[odd_index++].clone());
        addTransition(new UpdateTreeTransition(mergedRoot, "merged"));
    }
}

function breakEdge<T extends character>(edge: Edge<T>, length: number) {
    const added = new Edge(edge.label.slice(length));
    added.children = edge.children;
    added.type = edge.type;

    edge.label = edge.label.slice(0, length);
    edge.children = [added];
}
