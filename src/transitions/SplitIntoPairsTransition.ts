import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { ShowArrayTransition, TransitionBase } from ".";
import * as state from "../state";

export default class SplitIntoPairsTransition extends TransitionBase {
    public readonly pairs: Pair<character>[];

    // Previous: ShowArrayTransition
    _introduce() {
        this.updateView();

        // Trigger css transition
        state.get().pairArrayView.container.node().classList.add("split-into-pairs");
    }

    updateView() {
        state.get().pairArrayView.setPairs(this.pairs);
        state.get().pairArrayView.showAsPairArray();
    }

    _revoke() {
        const prev = this.previous as ShowArrayTransition;

        state.get().pairArrayView.setPairs(prev.pairs);
        state.get().pairArrayView.showAsArray();
    }

    constructor(pairs: Pair<character>[]) {
        super();
        this.pairs = [...pairs];
    }
}
