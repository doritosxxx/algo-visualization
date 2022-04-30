import PairArrayView from "../objects/PairArrayView";
import RemoveRepeatingPairsTransition from "./RemoveRepeatingPairsTransition";
import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class AppendPairIndicesTransition extends TransitionBase {
    public readonly indices: number[];

    // Previous: RemoveRepeatingPairsTransition
    _introduce() {
        const prev = this.previous as RemoveRepeatingPairsTransition;

        state.get().pairArrayView.setData(prev.pairs, this.indices);
    }

    _revoke() {
        const prev = this.previous as RemoveRepeatingPairsTransition;
        state.get().pairArrayView.setData(prev.pairs, []);
    }

    constructor(indices: number[]) {
        super();
        this.indices = [...indices];
    }
}
