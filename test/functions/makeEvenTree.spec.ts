import { character, word } from "../../src/types";
import { IndexedPair, SuffixTreeEdge, SuffixTreeNode } from "../../src/class";
import { makeEvenTree } from "../../src/functions";

class CompressedNode<T extends character> {
    public constructor(
        public readonly substrings: word<T>[] = [],
        public readonly childNodes: CompressedNode<T>[] = []
    ) {
        if (substrings.length != childNodes.length)
            throw new Error("`substrings` and `childNodes` must have same length");
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

function suffixTreeFromArray<T extends character>() {}

function expectSuffixTreesEquality<T extends character>(
    first: SuffixTreeNode<T>,
    second: SuffixTreeNode<T>
): jest.JestMatchers<boolean> {
    return expect(areTreesEqual(first, second));
}

test("One edge. o-o", () => {
    const tree = new SuffixTreeNode<number>();
    tree.edges.push(new SuffixTreeEdge<number>([0]));

    const pairs: IndexedPair<string>[] = [new IndexedPair("a", "b")];
    const even = makeEvenTree(tree, pairs);

    const desiredTree = new SuffixTreeNode<string>();
    desiredTree.edges.push(new SuffixTreeEdge<string>(["a", "b"]));

    expectSuffixTreesEquality(even, desiredTree);
});

test("Two edges chain. o-o-o", () => {
    const tree = new CompressedNode<number>([[0]], [new CompressedNode<number>([[1]], [new CompressedNode<number>()])]);
    const pairs: IndexedPair<string>[] = [new IndexedPair("a", "b"), new IndexedPair("c", "d")];
    const desired = new CompressedNode<string>(
        [["a", "b"]],
        [new CompressedNode<string>([["c", "d"]], [new CompressedNode<string>()])]
    );

	const even = makeEvenTree(tree.decompress(), pairs);
	expectSuffixTreesEquality(even, desired.decompress());
});
