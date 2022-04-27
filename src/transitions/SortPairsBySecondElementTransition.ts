import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { flatPairArray } from "../helpers";
import ArrayView from "../objects/ArrayView";
import SplitIntoPairsTransition from "./SplitIntoPairsTransition";
import TransitionBase from "./TransitionBase";

export default class SortPairsBySecondElementTransition extends TransitionBase {
    public arrayView: ArrayView;
    public readonly pairs: Pair<character>[];

    // Previous: SplitIntoPairsTransition
    _introduce() {
        const prev = this.previous as SplitIntoPairsTransition;
        this.arrayView = prev.arrayView;

        // Highlight with red font color.
        this.arrayView.selection.node().classList.add("highlight-even");

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
        const prev = this.previous as SplitIntoPairsTransition;

        this.arrayView.selection.node().classList.remove("highlight-even");
        prev.updateView();

        this.arrayView = null;
    }

    constructor(sortedPairs: Pair<character>[]) {
        super();
        this.pairs = [...sortedPairs];
    }
}
