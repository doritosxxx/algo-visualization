import { addTransition } from "../../../controller";
import { ShowOddTreeTransition } from "../../../transitions";
import { Edge, Leaf, Root } from "../../class";
import { character } from "../../types";

export default function makeOddTree<T extends character>(string: T[]): Root<T> {
    const tree = makeTrie(getOddSuffixes(string), string.length);
    addTransition(new ShowOddTreeTransition(tree));
    return tree;
}

function getOddSuffixes<T>(string: T[]): T[][] {
    const result: T[][] = [];

    for (let i = 1; i < string.length; i += 2) {
        result.push(string.slice(i));
    }

    return result;
}

function makeTrie<T extends character>(strings: T[][], length: number): Root<T> {
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
        current.children.push(new Leaf<T>(length - word.length));
    }

    compress(root);
    reorder(root);

    return root;
}

function compress<T extends character>(node: Edge<T>) {
    if (node instanceof Leaf) {
        return;
    }

    if (!(node instanceof Root))
        while (node.children.length == 1 && !(node.children[0] instanceof Leaf)) {
            const child = node.children[0];
            node.label.push(...child.label);
            node.children = child.children;
        }

    for (const child of node.children) {
        compress(child);
    }
}

function reorder<T extends character>(node: Edge<T>) {
    node.children.sort((a, b) => {
        if (a.label.length == 0) {
            return 1;
        }
        if (b.label.length == 0) {
            return -1;
        }
        return a.label[0] < b.label[0] ? -1 : 1;
    });
    for (const child of node.children) {
        reorder(child);
    }
}
