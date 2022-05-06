import { addTransition } from "../../../controller";
import { Edge, Leaf, Pair, Root } from "../../class";
import { character } from "../../types";

export default function makeOddTree<T extends character>(string: T[]): Root<T> {
    return makeTrie(getOddSuffixes(string));
}

function getOddSuffixes<T>(string: T[]): T[][] {
    const result: T[][] = [];

    for (let i = 1; i < string.length; i += 2) {
        result.push(string.slice(i));
    }

    return result;
}

function makeTrie<T extends character>(strings: T[][]): Root<T> {
    const root = new Root<T>();

    for (const word of strings) {
        let current = root;
        for (const char of word) {
            let next = current.children.find((edge) => edge.label[0] == char);
            if (!next) {
                next = new Edge<T>([char]);
                current.children.push(next);
            }
            current = next;
        }
        // TODO: index?
        current.children.push(new Leaf<T>(-1));
    }

    return root;
    // compress and reorder;
}
