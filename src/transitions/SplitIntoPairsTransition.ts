import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import { ShowArrayTransition, TransitionBase } from ".";

export default class SplitIntoPairsTransition extends TransitionBase {
    public pairArrayView: PairArrayView;
    public readonly pairs: Pair<character>[];

    // Previous: ShowArrayTransition
    _introduce() {
        const prev = this.previous as ShowArrayTransition;
        this.pairArrayView = prev.pairArrayView;

        this.updateView();

        // Trigger css transition
        this.pairArrayView.container.node().classList.add("split-into-pairs");
    }

    updateView() {
        this.pairArrayView.setPairs(this.pairs);
        this.pairArrayView.showAsPairArray();
    }

    _revoke() {
        const prev = this.previous as ShowArrayTransition;

        this.pairArrayView.setPairs(prev.pairs);
        this.pairArrayView.showAsArray();

        this.pairArrayView = null;
    }

    constructor(pairs: Pair<character>[]) {
        super();
        this.pairs = [...pairs];
    }
}
