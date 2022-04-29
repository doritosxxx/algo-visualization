import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import SortPairsByFirstElementTransition from "./SortPairsByFirstElementTransition";
import TransitionBase from "./TransitionBase";

export default class HighlightRepeatingPairsTransition extends TransitionBase {
    public indices: number[];
    public pairs: Pair<character>[];
    public pairArrayView: PairArrayView;

    _introduce() {
        const prev = this.previous as SortPairsByFirstElementTransition;
        this.pairArrayView = prev.pairArrayView;

        this.pairArrayView.highlightPairsWithBorder(this.indices);
    }

    _revoke() {
        this.pairArrayView.hideBorder();
        this.pairArrayView = null;
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
