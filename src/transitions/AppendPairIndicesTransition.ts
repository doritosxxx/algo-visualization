import ArrayView from "../objects/ArrayView";
import RemoveRepeatingPairsTransition from "./RemoveRepeatingPairsTransition";
import TransitionBase from "./TransitionBase";

export default class AppendPairIndicesTransition extends TransitionBase {
    public arrayView: ArrayView;

    public readonly indices: number[];

    // Previous: RemoveRepeatingPairsTransition
    _introduce() {
        const prev = this.previous as RemoveRepeatingPairsTransition;
        this.arrayView = prev.arrayView;

        this.arrayView.selection.node().classList.add("pairs-indexed");
    }
    _revoke() {
        this.arrayView.selection.node().classList.remove("pairs-indexed");
        this.arrayView = null;
    }

    constructor(indices: number[]) {
        super();
        this.indices = [...indices];
    }
}
