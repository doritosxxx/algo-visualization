import { Root, Edge } from "../class";
import { character } from "../types";
import { makeEvenTree } from "../functions";
import radixSort from "./radixSort";
import reindex from "./reindex";
import splitIntoPairs from "./splitIntoPairs";
import unique from "./unique";

// Step 1.
export default function farach<T extends character>(word: T[]): Root<T> {
    // Тривиальный случай.
    if (word.length == 1) {
        const root = new Root<T>();
        root.edges.push(new Edge(word));
        return root;
    }

    const pairs = splitIntoPairs(word);
    const sorted = radixSort(pairs);
    const unique_ = unique(sorted);
    const compressed = reindex(pairs, unique_);

    const tree = farach(compressed);

    const evenTree = makeEvenTree(tree, unique_);


}
