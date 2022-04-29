import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { flatPairArray } from "../helpers";
import PairArrayView from "../objects/PairArrayView";
import { SortPairsByFirstElementTransition, TransitionBase } from ".";

export default class RemoveRepeatingPairsTransition extends TransitionBase {
    public arrayView: PairArrayView;
    public readonly pairs: Pair<character>[];

    _introduce() {
        const prev = this.previous as SortPairsByFirstElementTransition;
        this.arrayView = prev.pairArrayView;

        this.arrayView.selection.node().classList.remove("highlight-odd");
        this.updateView();
    }

    updateView() {
        const array = flatPairArray(this.pairs);
        this.arrayView.data(array).join(
            (enter) => enter,
            (update) => update.text((d) => d),
            (exit) => exit.remove()
        );
    }

    // TODO
    _revoke() {
        const prev = this.previous as SortPairsByFirstElementTransition;
        this.arrayView.selection.node().classList.add("highlight-odd");
        prev.updateView();

        this.arrayView = null;
    }

    constructor(unique: Pair<character>[]) {
        super();
        this.pairs = [...unique];
    }
}
