import { Leaf, Root } from "../../class";
import { character } from "../../types";

export default function multiplyLeafIndices<T extends character>(tree: Root<T>): void {
    _multiplyLeafIndices(tree);
}

function _multiplyLeafIndices<T extends character>(tree: Root<T>): void {
    if (tree instanceof Leaf) {
        tree.suffixIndex *= 2;
    } else {
        tree.children.forEach((child) => _multiplyLeafIndices(child));
    }
}
