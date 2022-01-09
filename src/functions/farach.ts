import IndexedPair from "../class/IndexedPair";
import SuffixTree from "../class/SuffixTree";
import { character } from "../types";
import makeEvenTree from "./makeEvenTree";
import radixSort from "./radixSort";
import reindex from "./reindex";
import splitIntoPairs from "./splitIntoPairs";
import unique from "./unique";

let step = 1;

export default function farach<T extends character>(word: T[]): SuffixTree {
    // Тривиальный случай.
    if (word.length == 1) {
        const tree = new SuffixTree();
        // TODO: add edge.
        return tree;
    }

    const pairs = splitIntoPairs(word);
    const sorted = radixSort(pairs);
	const unique_ = unique(sorted);
	const compressed = reindex(pairs, unique_);

	console.log(compressed);

	const tree = farach(compressed);

	const evenTree = makeEvenTree(tree, unique_);


}
