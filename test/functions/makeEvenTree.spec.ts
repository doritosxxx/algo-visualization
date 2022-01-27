import { character, word } from "../../src/types";
import { Pair, SuffixTreeEdge, SuffixTreeNode } from "../../src/class";
import { makeEvenTree } from "../../src/functions";

class CompressedNode<T extends character> {
    public constructor(
        public readonly substrings: word<T>[] = [],
        public readonly childNodes: CompressedNode<T>[] = []
    ) {
        if (substrings.length != childNodes.length)
            throw new Error(
                "`substrings` and `childNodes` must have same length. " +
                    `${substrings.length} and ${childNodes.length} provided.`
            );
    }

    public decompress(): SuffixTreeNode<T> {
        const root = new SuffixTreeNode<T>();
        for (let i = 0; i < this.substrings.length; i++) {
            const edge = new SuffixTreeEdge<T>(this.substrings[i]);
            edge.endNode = this.childNodes[i].decompress();
            root.edges.push(edge);
        }
        return root;
    }
}

function areArraysEqual<T>(first: T[], second: T[]): boolean {
    return first.length == second.length && first.every((element, index) => second[index] == element);
}

function areTreesEqual<T extends character>(first: SuffixTreeNode<T>, second: SuffixTreeNode<T>): boolean {
    if (first.edges.length != second.edges.length) {
        return false;
    }

    return first.edges.every(
        (edge, i) =>
            areArraysEqual(edge.substring, second.edges[i].substring) &&
            areTreesEqual(edge.endNode, second.edges[i].endNode)
    );
}

function expectSuffixTreesEquality<T extends character>(
    first: SuffixTreeNode<T>,
    second: SuffixTreeNode<T>
): jest.JestMatchers<boolean> {
    return expect(areTreesEqual(first, second));
}

test("One edge. o-o", () => {
    const tree = new SuffixTreeNode<number>();
    tree.edges.push(new SuffixTreeEdge<number>([0]));

    const pairs: Pair<string>[] = [new Pair("a", "b")];
    const even = makeEvenTree(tree, pairs);

    const desiredTree = new SuffixTreeNode<string>();
    desiredTree.edges.push(new SuffixTreeEdge<string>(["a", "b"]));

    expectSuffixTreesEquality(even, desiredTree).toBe(true);
});

test("Two edges chain. o-o-o", () => {
    const tree = new CompressedNode<number>([[0]], [new CompressedNode<number>([[1]], [new CompressedNode<number>()])]);
    const pairs: Pair<string>[] = [new Pair("a", "b"), new Pair("c", "d")];
    const desired = new CompressedNode<string>(
        [["a", "b"]],
        [new CompressedNode<string>([["c", "d"]], [new CompressedNode<string>()])]
    );

    const even = makeEvenTree(tree.decompress(), pairs);
    expectSuffixTreesEquality(even, desired.decompress()).toBe(true);
});

test("Tho edges fork", () => {
    const tree = new CompressedNode<number>([[0], [1]], [new CompressedNode<number>(), new CompressedNode<number>()]);
    const pairs: Pair<string>[] = [new Pair("a", "b"), new Pair("c", "d")];
    const desired = new CompressedNode<string>(
        [
            ["a", "b"],
            ["c", "d"],
        ],
        [new CompressedNode<string>(), new CompressedNode<string>()]
    );

    const even = makeEvenTree(tree.decompress(), pairs);
    expectSuffixTreesEquality(even, desired.decompress()).toBe(true);
});

//     O            O            O
//  0/  \1  --> ab/  \ac -->    a|
//  O   O        O   O           O
//                            b / \ c
//                             O  O
test("Two edges fork with same first character", () => {
    const tree = new CompressedNode<number>([[0], [1]], [new CompressedNode(), new CompressedNode()]);
    const pairs: Pair<string>[] = [new Pair("a", "b"), new Pair("a", "c")];
    const desired = new CompressedNode<string>(
        [["a"]],
        [new CompressedNode([["b"], ["c"]], [new CompressedNode(), new CompressedNode()])]
    );

	const even = makeEvenTree(tree.decompress(), pairs);

    console.log(even.toString());
    console.log(desired.decompress().toString());
    
    expectSuffixTreesEquality(even, desired.decompress()).toBe(true);
});
