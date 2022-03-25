import { character, word } from "../../src/algorithm/types";
import { Pair, Edge, Root } from "../../src/algorithm/class";
import { makeEvenTree } from "../../src/algorithm/functions";

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

    public decompress(letters: word<T> = []): Edge<T> {
        const root = new Edge<T>(letters);
        for (let i = 0; i < this.substrings.length; i++) {
            const edge = this.childNodes[i].decompress();
			edge.letters = this.substrings[i];
            root.edges.push(edge);
        }
        return root;
    }

    public static getArray<T extends character>(length: number) {
        if (length < 0) {
            throw new RangeError("array length must be greater than 0");
        }
        return new Array(length).fill(0).map((_) => new CompressedNode<T>());
    }
}

function areArraysEqual<T>(first: T[], second: T[]): boolean {
    return first.length == second.length && first.every((element, index) => second[index] == element);
}

function areTreesEqual<T extends character>(first: Edge<T>, second: Edge<T>): boolean {
    if (first.edges.length != second.edges.length) {
        return false;
    }

    return first.edges.every(
        (edge, i) =>
            areArraysEqual(edge.letters, second.edges[i].letters) &&
            areTreesEqual(edge, second.edges[i])
    );
}

function expectSuffixTreesEquality<T extends character>(
    first: Edge<T>,
    second: Edge<T>
): jest.JestMatchers<boolean> {
    return expect(areTreesEqual(first, second));
}

test("One edge. o-o", () => {
    const tree = new Root<number>();
    tree.edges.push(new Edge<number>([0]));

    const pairs: Pair<string>[] = [new Pair("a", "b")];
    const even = makeEvenTree(tree, pairs);

    const desiredTree = new Root<string>();
    desiredTree.edges.push(new Edge<string>(["a", "b"]));

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

//     O            O
//  0/  \1  --> ab/  \cd
//  O   O        O   O
test("Two edges fork", () => {
    const tree = new CompressedNode<number>([[0], [1]], CompressedNode.getArray(2));
    const pairs: Pair<string>[] = [new Pair("a", "b"), new Pair("c", "d")];
    const desired = new CompressedNode<string>(
        [
            ["a", "b"],
            ["c", "d"],
        ],
        CompressedNode.getArray(2)
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
        [new CompressedNode([["b"], ["c"]], CompressedNode.getArray(2))]
    );

    const even = makeEvenTree(tree.decompress(), pairs);

    expectSuffixTreesEquality(even, desired.decompress()).toBe(true);
});

//      O                O              O
//   0/ |1 \2 -->   ab/ |ac \bc -->   a/ \bc
//   O  O  O         O  O    O        O  O
//                                  b/ \c
//                                  O   O
test("Three edges fork with both same and different first characters", () => {
    const tree = new CompressedNode<number>([[0], [1], [2]], CompressedNode.getArray(3));
    const pairs: Pair<string>[] = [new Pair("a", "b"), new Pair("a", "c"), new Pair("b", "c")];

    const desired = new CompressedNode<string>(
        [["a"], ["b", "c"]],
        [new CompressedNode([["b"], ["c"]], CompressedNode.getArray(2)), new CompressedNode()]
    );

    const even = makeEvenTree(tree.decompress(), pairs);

    expectSuffixTreesEquality(even, desired.decompress()).toBe(true);
});

//    O           O                O
//  0/ \1      ab/ \ac             |a
//  O  O    --> O   O     -->      O
// 2| 2| \3   za| za| \zz        b/ \c
//  O  O O     O    O  O         O  O
//                             za|  |z
//                               O  O
//                                a/ \z
//                                O  O
test("Double merge recursion test", () => {
    const tree = new CompressedNode<number>(
        [[0], [1]],
        [new CompressedNode([[2]], [new CompressedNode()]), new CompressedNode([[2], [3]], CompressedNode.getArray(2))]
    );

    const pairs: Pair<string>[] = [new Pair("a", "b"), new Pair("a", "c"), new Pair("z", "a"), new Pair("z", "z")];

    const desired = new CompressedNode<string>(
        [["a"]],
        [
            new CompressedNode(
                [["b"], ["c"]],
                [
                    new CompressedNode([["z", "a"]], [new CompressedNode()]),
                    new CompressedNode([["z"]], [new CompressedNode([["a"], ["z"]], CompressedNode.getArray(2))]),
                ]
            ),
        ]
    );

    const even = makeEvenTree(tree.decompress(), pairs);
    expectSuffixTreesEquality(even, desired.decompress()).toBe(true);
});

//    O             O           O
// 02/ \12 --> 4678/ \4578 --> 4|
//  O  O          O  O          O
//                          678/ \578
//                            O  O
test("Multiple letters in substring with merge", () => {
    const tree = new CompressedNode<number>(
        [
            [0, 2],
            [1, 2],
        ],
        CompressedNode.getArray(2)
    );

    const pairs: Pair<number>[] = [new Pair(4, 6), new Pair(4, 5), new Pair(7, 8)];
    const desired = new CompressedNode<number>(
        [[4]],
        [
            new CompressedNode(
                [
                    [6, 7, 8],
                    [5, 7, 8],
                ],
                CompressedNode.getArray(2)
            ),
        ]
    );

    const even = makeEvenTree(tree.decompress(), pairs);
    expectSuffixTreesEquality(even, desired.decompress());
});
