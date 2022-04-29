import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { flatPairArray } from "../helpers";
import PairArrayView from "../objects/PairArrayView";
import { TransitionBase, SplitIntoPairsTransition } from ".";

export default class SortPairsBySecondElementTransition extends TransitionBase {
    public pairArrayView: PairArrayView;
    public readonly pairs: Pair<character>[];

    private prevprev: SplitIntoPairsTransition;

    // Previous: ClonePairArrayTransition
    _introduce() {
        // Double previuos to skip transition.
        this.prevprev = this.previous.previous as SplitIntoPairsTransition;
        this.pairArrayView = this.prevprev.pairArrayView;

        // Highlight with red font color.
        this.pairArrayView.highlightSecondElement();
        this.updateView();
    }

    updateView() {
        const prev = this.pairArrayView.getPairs();
        const order = this.pairs.map((pair) => prev.indexOf(pair));
        this.pairArrayView.reorder(order);
        this.pairArrayView.setPairs(this.pairs);
    }

    _revoke() {

        this.pairArrayView.hideSecondElement();
        this.prevprev.updateView();

        this.pairArrayView = null;
    }

    constructor(sortedPairs: Pair<character>[]) {
        super();
        this.pairs = [...sortedPairs];
    }
}
