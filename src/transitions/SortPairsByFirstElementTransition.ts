import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import ArrayView from "../objects/ArrayView";
import SortPairsBySecondElementTransition from "./SortPairsBySecondElementTransition";
import SplitIntoPairsTransition from "./SplitIntoPairsTransition";
import TransitionBase from "./TransitionBase";

export default class SortPairsByFirstElementTransition extends TransitionBase {
    arrayView: ArrayView;
    pairs: Pair<character>[];

    _introduce() {
        const prev = this.previous as SortPairsBySecondElementTransition;
        this.arrayView = prev.arrayView;

        // Highlight with red font color.
        this.arrayView.selection.node().classList.remove("highlight-even");
        this.arrayView.selection.node().classList.add("highlight-odd");

        const array = this.pairs.flatMap((p) => [p.first, p.second]).map((e) => (e == null ? "$" : e + ""));
        this.arrayView.data(array).join(
            (enter) => enter,
            (update) => update.text(d=>d)
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
