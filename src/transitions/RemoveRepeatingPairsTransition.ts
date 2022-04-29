import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import { SortPairsByFirstElementTransition, TransitionBase } from ".";
import HighlightRepeatingPairsTransition from "./HighlightRepeatingPairsTransition";

export default class RemoveRepeatingPairsTransition extends TransitionBase {
    public arrayView: PairArrayView;
    public readonly pairs: Pair<character>[];
    public indices: number[];

    _introduce() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        this.arrayView = prev.pairArrayView;
        this.indices = prev.indices;

        this.arrayView.hideFirstElement();
        this.updateView();
    }

    updateView() {
        this.arrayView.remove(this.indices);
    }

    _revoke() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        this.arrayView.setPairs(prev.pairs);
        this.arrayView.highlightPairsWithBorder(prev.indices);

        this.arrayView = null;
    }

    constructor(unique: Pair<character>[]) {
        super();
        this.pairs = [...unique];
    }
}
