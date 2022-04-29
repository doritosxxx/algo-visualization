import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { flatPairArray } from "../helpers";
import PairArrayView from "../objects/PairArrayView";
import { SortPairsBySecondElementTransition, TransitionBase } from ".";

export default class SortPairsByFirstElementTransition extends TransitionBase {
    pairArrayView: PairArrayView;
    pairs: Pair<character>[];

    _introduce() {
        const prev = this.previous as SortPairsBySecondElementTransition;
        this.pairArrayView = prev.pairArrayView;

        // Highlight with red font color.
		this.pairArrayView.hideSecondElement();
		this.pairArrayView.highlightFirstElement();

        this.updateView();
    }

    updateView() {
        const prev = this.pairArrayView.getPairs();
        const order = this.pairs.map((pair) => prev.indexOf(pair));
        this.pairArrayView.reorder(order);
        this.pairArrayView.setPairs(this.pairs);
    }

    _revoke() {
        const prev = this.previous as SortPairsBySecondElementTransition;

        this.pairArrayView.highlightSecondElement();
		this.pairArrayView.hideFirstElement();

        prev.updateView();
        this.pairArrayView = null;
    }

    constructor(sortedPairs: Pair<character>[]) {
        super();
        this.pairs = [...sortedPairs];
    }
}
