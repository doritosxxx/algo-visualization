import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
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
        const array = this.pairs.flatMap((p) => [p.first, p.second]).map((e) => (e == null ? "$" : e + ""));
        this.arrayView.data(array).join(
            (enter) => enter,
            (update) => update.text((d) => d)
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
