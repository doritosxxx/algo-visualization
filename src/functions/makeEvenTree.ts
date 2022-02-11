import Pair from "../class/Pair";
import { Root, Edge, Leaf } from "../class";
import { character } from "../types";

// This function can't change substrings in-place because new tree type can be different.
function unfold<T extends character>(node: Edge<number>, pairs: Pair<T>[]): Edge<T> {
    let unfolded: Edge<T> | null = null;
    const letters = node.letters.map((letter) => pairs[letter]).flatMap((pair) => [pair.first, pair.second]);

    if (node instanceof Root) {
        unfolded = new Root<T>();
    } else if (node instanceof Leaf) {
        unfolded = new Leaf(letters, (node as Leaf<T>).suffixIndex);
    } else {
        unfolded = new Edge<T>(letters);
    }

    for (const edge of node.edges) {
        unfolded.edges.push(unfold<T>(edge, pairs));
    }

    return unfolded;
}

type edgeGroupArray<T extends character> = Edge<T>[][];

// Fixes in-place
function fixCommonBeginnings<T extends character>(tree: Edge<T>): void {
    const newEdges: Edge<T>[] = [];

    // Array of arrays of egdes.
    // Each array contains edges with the same first character.
    const edgeGroups = tree.edges.reduce((array: edgeGroupArray<T>, edge) => {
        // If groups are empty.
        // Or if last group has different first character.
        if (array.length == 0 || array.at(-1).at(0).letters[0] != edge.letters[0]) {
            array.push([edge]);
            return array;
        }

        // If last group exists and has same first character.
        array.at(-1).push(edge);
        return array;
    }, []);

    for (const group of edgeGroups) {
        if (group.length == 1) {
            newEdges.push(group[0]);
        } else {
            const groupFirstCharacter = group[0].letters[0];
            const insertedEdge = new Edge<T>([groupFirstCharacter]);
            newEdges.push(insertedEdge);

            for (const edge of group) {
                // TODO: `shift` uses O(n) time complexity, which can lead to O(n^2) overall time comlexity.
                // TODO: maybe lists are suitable?
                edge.letters.shift();
                insertedEdge.edges.push(edge);
            }
        }
    }

    // Begin resursion for child nodes.
    for (const edge of tree.edges) {
        fixCommonBeginnings(edge);
    }

    tree.edges.length = 0;
    newEdges.forEach((edge) => tree.edges.push(edge));
}

// Step 2.
export default function makeEvenTree<T extends character>(tree: Root<number>, pairs: Pair<T>[]): Root<T> {
    const evenTree : Root<T> = unfold(tree, pairs);
    fixCommonBeginnings(evenTree);
    return evenTree;
}
