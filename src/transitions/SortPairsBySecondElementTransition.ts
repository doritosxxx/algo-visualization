import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { flatPairArray } from "../helpers";
import PairArrayView from "../objects/PairArrayView";
import { TransitionBase, SplitIntoPairsTransition } from ".";
import * as state from "../state";

export default class SortPairsBySecondElementTransition extends TransitionBase {
    public readonly pairs: Pair<character>[];

    // Previous: ClonePairArrayTransition
    _introduce() {
        // Highlight with red font color.
        state.get().pairArrayView.highlightSecondElement();
        this.updateView();
    }

    updateView() {
        const pairArrayView = state.get().pairArrayView;
        const prev = pairArrayView.getPairs();
        const order = this.pairs.map((pair) => prev.indexOf(pair));
        pairArrayView.reorder(order);
        pairArrayView.setPairs(this.pairs);
    }

    _revoke() {
        state.get().pairArrayView.hideSecondElement();

        (this.previous.previous as SplitIntoPairsTransition).updateView();
    }

    constructor(sortedPairs: Pair<character>[]) {
        super();
        this.pairs = [...sortedPairs];
    }
}
