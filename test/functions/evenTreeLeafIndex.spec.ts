import { Edge, Leaf, Pair, Root } from "../../src/algorithm/class";
import { makeEvenTree } from "../../src/algorithm/functions";
import { character } from "../../src/algorithm/types";

function areLeafIndexesCorrect<T extends character>(tree: Edge<T>): boolean {
    const indexes: number[] = [];
    getLeafIndexes(tree, indexes);
    const contains: boolean[] = Array(indexes.length).fill(false);

    for (const index of indexes) {
        if (index % 2 == 1) {
            throw new Error(`Index ${index} is not even.`);
        }
        if (index / 2 >= indexes.length) {
            throw new RangeError(`Index ${index} is out of bounds (${indexes.length * 2})`);
        }
        if (contains[index / 2]) {
            throw new Error(`Index ${index} included twice.`);
        }
        contains[index / 2] = true;
    }

    return true;
}

function getLeafIndexes<T extends character>(tree: Edge<T>, indexes: number[]) {
    if (tree instanceof Leaf) {
        if (tree.edges.length != 0) {
            throw new Error("Leaf node shouldn't have child nodes.");
        }
        indexes.push((tree as Leaf<T>).suffixIndex);
    } else if (tree.edges.length == 0) {
        throw new Error("Only Leaf nodes can have zero child nodes.");
    } else {
        for (const edge of tree.edges) {
            getLeafIndexes(edge, indexes);
        }
    }
}

test("One edge case", function () {
    const tree = new Root<number>();
    tree.edges.push(new Leaf<number>([0], 0));

    const pairs: Pair<string>[] = [new Pair("a", "b")];
    const even = makeEvenTree(tree, pairs);

    expect(areLeafIndexesCorrect(even)).toBe(true);
});

//     O            O
//  0/  \1  --> ab/  \cd
//  O   O        O   O
test("Two edge case with multiplication", () => {
    const tree = new Root<number>();
    tree.edges.push(new Leaf<number>([0], 0));
    tree.edges.push(new Leaf<number>([1], 1));

    const pairs: Pair<string>[] = [new Pair("a", "b"), new Pair("c", "d")];

    const even = makeEvenTree(tree, pairs);

	expect(areLeafIndexesCorrect(even)).toBe(true);
});