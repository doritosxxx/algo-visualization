import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { HighlightRepeatingPairsTransition, TransitionBase } from ".";
import * as state from "../state";

export default class RemoveRepeatingPairsTransition extends TransitionBase {
    public readonly pairs: Pair<character>[];
    public indices: number[];

    _introduce() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        this.indices = prev.indices;

        state.get().pairArrayView.hideFirstElement();
        this.updateView();
    }

    updateView() {
        state.get().pairArrayView.remove(this.indices);
    }

    _revoke() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        state.get().pairArrayView.setPairs(prev.pairs);
        state.get().pairArrayView.highlightPairsWithBorder(prev.indices);
    }

    constructor(unique: Pair<character>[]) {
        super();
        this.pairs = [...unique];
    }
}
