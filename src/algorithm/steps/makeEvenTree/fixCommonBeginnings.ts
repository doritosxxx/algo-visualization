import { Edge, Leaf, Root } from "../../class";
import { character } from "../../types";

type edgeGroupArray<T extends character> = Edge<T>[][];

export default function fixCommonBeginnings<T extends character>(tree: Root<T>): void {
    return _fixCommonBeginnings(tree);
}

// Fixes in-place
function _fixCommonBeginnings<T extends character>(current: Edge<T>): void {
    if (current instanceof Leaf) {
        return;
    }

    // Array of arrays of egdes.
    // Each array contains edges with the same first character.
    const edgeGroups = current.children.reduce((groups: edgeGroupArray<T>, edge) => {
        // If groups are empty.
        // Or if edge is leaf.
        // Or if last group has different first character.
        if (edge instanceof Leaf || groups.length == 0 || groups.at(-1).at(0).label[0] != edge.label[0]) {
            // Create new group.
            groups.push([edge]);
            return groups;
        }

        // If last group exists and has same first character.
        // Push current edge info last group.
        groups.at(-1).push(edge);
        return groups;
    }, []);

    const newEdges: Edge<T>[] = [];

    // Each group is one new node child now.
    for (const group of edgeGroups) {
        if (group.length == 1) {
            newEdges.push(group[0]);
        } else {
            const groupFirstCharacter = group[0].label[0];
            const insertedEdge = new Edge<T>([groupFirstCharacter]);
            newEdges.push(insertedEdge);

            for (const edge of group) {
                edge.label.shift();
                insertedEdge.children.push(edge);
            }
        }
    }

    // If amount of new child nodes equals 1
    // Delete only child node and it's hang children to current node.
    if (newEdges.length == 1 && current instanceof Root == false && newEdges[0] instanceof Leaf == false) {
        current.label.push(newEdges[0].label[0]);
        current.children = newEdges[0].children;
    }
    // Else replace children of current node.
    else {
        current.children = newEdges;
    }

    // Begin resursion for child nodes.
    for (const edge of current.children) {
        fixCommonBeginnings(edge);
    }
}
