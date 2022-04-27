import { addTransition } from "../../../controller";
import ShowArrayTransition from "../../../transitions/ShowArrayTransition";
import SortPairsByFirstElementTransition from "../../../transitions/SortPairsByFirstElementTransition";
import SortPairsBySecondElementTransition from "../../../transitions/SortPairsBySecondElementTransition";
import SplitIntoPairsTransition from "../../../transitions/SplitIntoPairsTransition";
import { Leaf, Root } from "../../class";
import { character } from "../../types";
import reindex from "./reindex";
import splitIntoPairs from "./splitIntoPairs";
import stableSort from "./stableSort";
import unique from "./unique";

export function makeSuffixTree(string: string): Root<string> {
    return suffixTree([...string]);
}

function suffixTree<T extends character>(word: T[]): Root<T> {
    addTransition(new ShowArrayTransition(word));

    // Тривиальный случай.
    if (word.length == 1) {
        const root = new Root<T>();
        root.edges.push(new Leaf(word, 0));
        return root;
    }

    let pairs = splitIntoPairs(word);
    addTransition(new SplitIntoPairsTransition(pairs));

    pairs = stableSort(pairs, pair => pair.second);
    addTransition(new SortPairsBySecondElementTransition(pairs));

    pairs = stableSort(pairs, pair => pair.first);
	addTransition(new SortPairsByFirstElementTransition(pairs));


    const _unique = unique(pairs);
    // TODO: transition

    const compressed = reindex(pairs, _unique);
    // TODO: transition

    const tree = suffixTree(compressed);
    // TODO: transition
}

