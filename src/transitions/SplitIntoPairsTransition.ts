import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import ArrayView from "../objects/ArrayView";
import ShowStringTransition from "./ShowArrayTransition";
import TransitionBase from "./TransitionBase";

export default class SplitIntoPairsTransition extends TransitionBase {
    public arrayView: ArrayView;
    public readonly pairs: Pair<character>[];

    // Previous: ShowArrayTransition
    _introduce() {
        const prev = this.previous as ShowStringTransition;
        this.arrayView = prev.arrayView;

        // Update data.
        this.updateView();

        // Trigger css transition
        this.arrayView.selection.node().classList.add("split-into-pairs");
    }

    updateView() {
        const array = this.pairs
            .flatMap((pair) => [pair.first, pair.second])
            .map((item) => (item == null ? "$" : item + ""));

        this.arrayView.data(array).join(
            (enter) => enter.append("div").text((d) => d),
            (update) => update.text((d) => d)
        );
    }

    _revoke() {
        const prev = this.previous as ShowStringTransition;

        this.arrayView.selection.node().classList.remove("split-into-pairs");
        this.arrayView.data(prev.word.map(String)).join(
            (enter) => enter.append("div").text((d) => d),
            (update) => update.text((d) => d)
        );

        this.arrayView = null;
    }

    constructor(pairs: Pair<character>[]) {
        super();

        this.pairs = [...pairs];
    }
}
