import Pair from "../class/Pair";
import { Root, Edge } from "../class";
import { character } from "../types";
import IEdgeContainer from "../interface/IEdgeContainer";



// This function can't change substrings in-place because new tree type can be different.
function unfold<T extends character>(tree: IEdgeContainer<number>, pairs: Pair<T>[]): IEdgeContainer<T> {
    const unfolded = new Root<T>();
    for (const edge of tree.edges) {
        const word = edge.letters.map((letter) => pairs[letter]).flatMap((pair) => [pair.first, pair.second]);

        const unfolderEdge = new Edge<T>(word);
        unfolderEdge.endNode = unfold(edge.endNode, pairs);
        unfolded.edges.push(unfolderEdge);
    }

    return unfolded;
}

type edgeGroupArray<T extends character> = SuffixTreeEdge<T>[][];

// Fixes in-place
function fixCommonBeginnings<T extends character>(tree: SuffixTreeNode<T>): void {
    const newEdges: SuffixTreeEdge<T>[] = [];

    // Array of arrays of egdes.
    // Each array contains edges with the same first character.
    const edgeGroups = tree.edges.reduce((array: edgeGroupArray<T>, edge) => {
        // If groups are empty.
        // Or if last group has different first character.
        if (array.length == 0 || array.at(-1).at(0).substring[0] != edge.substring[0]) {
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
            const groupFirstCharacter = group[0].substring[0];
            const insertedEdge = new SuffixTreeEdge<T>([groupFirstCharacter]);
            newEdges.push(insertedEdge);

            for (const edge of group) {
                // TODO: `shift` uses O(n) time complexity, which can lead to O(n^2) overall time comlexity.
                // TODO: maybe lists are suitable?
                edge.substring.shift();
                insertedEdge.endNode.edges.push(edge);
            }
        }
    }

    // Begin resursion for child nodes.
    for (const edge of tree.edges) {
        fixCommonBeginnings(edge.endNode);
    }

	tree.edges.length = 0;
	newEdges.forEach(edge => tree.edges.push(edge));

}

// Step 2.
export default function makeEvenTree<T extends character>(
    tree: Root<number>,
    pairs: Pair<T>[]
): Root<T> {
    const evenTree = unfold(tree, pairs);
    fixCommonBeginnings(evenTree);
    return evenTree;
}
