import { addTransition } from "../../../controller";
import {
    AppendPairIndicesTransition,
    ConnectEqualPairsTransition,
    RemoveRepeatingPairsTransition,
    ShowArrayTransition,
    SortPairsByFirstElementTransition,
    SortPairsBySecondElementTransition,
    SplitIntoPairsTransition,
    ClonePairArrayTransition,
    HighlightRepeatingPairsTransition,
    PushArrayToStackTransition,
    ShowTrivialTreeTransition,
} from "../../../transitions";
import { Edge, Leaf, Root } from "../../class";
import { character } from "../../types";
import makeEvenTree from "../makeEvenTree";
import reindex from "./reindex";
import splitIntoPairs from "./splitIntoPairs";
import stableSort from "./stableSort";
import unique from "./unique";

export function makeSuffixTree(string: string): Root<string> {
    return suffixTree([...string]);
}

function suffixTree<T extends character>(word: T[]): Root<T> {
    let pairs = splitIntoPairs(word);
    addTransition(new ShowArrayTransition(pairs));

    // Тривиальный случай.
    if (word.length <= 1) {
        const root = new Root<T>();
        const edge = new Edge<T>(word);
        const leaf = new Leaf<T>(0);

        root.children.push(edge);
        edge.children.push(leaf);

        addTransition(new ShowTrivialTreeTransition(root));
        return root;
    }

    addTransition(new SplitIntoPairsTransition(pairs));
    addTransition(new ClonePairArrayTransition(pairs));

    let sorted = stableSort(pairs, (pair) => pair.second);
    addTransition(new SortPairsBySecondElementTransition(sorted));

    sorted = stableSort(sorted, (pair) => pair.first);
    addTransition(new SortPairsByFirstElementTransition(sorted));

    const _unique = unique(sorted);
    addTransition(new HighlightRepeatingPairsTransition(sorted, _unique));
    addTransition(new RemoveRepeatingPairsTransition(_unique));
    addTransition(new AppendPairIndicesTransition(_unique.map((_, i) => i)));

    const compressed: number[] = reindex(pairs, _unique);
    addTransition(
        new ConnectEqualPairsTransition(
            _unique.map((_, i) => i),
            compressed
        )
    );
    addTransition(new PushArrayToStackTransition());

    const tree = suffixTree(compressed);

    // Step 2.
    const evenTree = makeEvenTree(tree, _unique);

    throw new Error("stop it");
}
