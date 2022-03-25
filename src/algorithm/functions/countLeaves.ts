import { Edge, Leaf } from "../class";
import { character } from "../types";

export default function countLeaves<T extends character>(tree: Edge<T>) {
    if (tree instanceof Leaf) {
        return 1;
    }

    return tree.edges.map((edge) => countLeaves(edge)).reduce((p, c) => p + c, 0);
}
