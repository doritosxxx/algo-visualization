import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import SortPairsByFirstElementTransition from "./SortPairsByFirstElementTransition";
import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class HighlightRepeatingPairsTransition extends TransitionBase {
    public indices: number[];
    public pairs: Pair<character>[];

    _introduce() {
        state.get().pairArrayView.highlightPairsWithBorder(this.indices);
    }

    _revoke() {
        state.get().pairArrayView.hideBorder();
    }

    constructor(pairs: Pair<character>[], unique: Pair<character>[]) {
        super();

        this.indices = [];
        this.pairs = [...pairs];

        for (let i = 0; i < pairs.length; ++i) {
            if (unique.indexOf(pairs[i]) == -1) {
                this.indices.push(i);
            }
        }
    }
}
