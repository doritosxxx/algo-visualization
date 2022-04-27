import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { flatPairArray } from "../helpers";
import ArrayView from "../objects/ArrayView";
import { SortPairsBySecondElementTransition, TransitionBase } from ".";

export default class SortPairsByFirstElementTransition extends TransitionBase {
    arrayView: ArrayView;
    pairs: Pair<character>[];

    _introduce() {
        const prev = this.previous as SortPairsBySecondElementTransition;
        this.arrayView = prev.arrayView;

        // Highlight with red font color.
        this.arrayView.selection.node().classList.remove("highlight-even");
        this.arrayView.selection.node().classList.add("highlight-odd");

        this.updateView();
    }

    updateView() {
        const array = flatPairArray(this.pairs);
        this.arrayView.data(array).join(
            (enter) => enter.append("div").text((d) => d),
            (update) => update.text((d) => d),
            (exit) => exit.remove()
        );
    }

    _revoke() {
        const prev = this.previous as SortPairsBySecondElementTransition;

        this.arrayView.selection.node().classList.remove("highlight-odd");
        this.arrayView.selection.node().classList.add("highlight-even");

        prev.updateView();
        this.arrayView = null;
    }

    constructor(sortedPairs: Pair<character>[]) {
        super();
        this.pairs = [...sortedPairs];
    }
}
