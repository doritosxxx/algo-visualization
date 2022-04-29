import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import { SortPairsByFirstElementTransition, TransitionBase } from ".";
import HighlightRepeatingPairsTransition from "./HighlightRepeatingPairsTransition";

export default class RemoveRepeatingPairsTransition extends TransitionBase {
    public pairArrayView: PairArrayView;
    public readonly pairs: Pair<character>[];
    public indices: number[];

    _introduce() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        this.pairArrayView = prev.pairArrayView;
        this.indices = prev.indices;

        this.pairArrayView.hideFirstElement();
        this.updateView();
    }

    updateView() {
        this.pairArrayView.remove(this.indices);
    }

    _revoke() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        this.pairArrayView.setPairs(prev.pairs);
        this.pairArrayView.highlightPairsWithBorder(prev.indices);

        this.pairArrayView = null;
    }

    constructor(unique: Pair<character>[]) {
        super();
        this.pairs = [...unique];
    }
}
