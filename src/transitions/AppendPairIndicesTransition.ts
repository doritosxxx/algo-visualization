import PairArrayView from "../objects/PairArrayView";
import RemoveRepeatingPairsTransition from "./RemoveRepeatingPairsTransition";
import TransitionBase from "./TransitionBase";

export default class AppendPairIndicesTransition extends TransitionBase {
    public pairArrayView: PairArrayView;

    public readonly indices: number[];

    // Previous: RemoveRepeatingPairsTransition
    _introduce() {
        const prev = this.previous as RemoveRepeatingPairsTransition;
        this.pairArrayView = prev.pairArrayView;

        this.pairArrayView.setData(prev.pairs, this.indices);
    }

    _revoke() {
        const prev = this.previous as RemoveRepeatingPairsTransition;
        this.pairArrayView.setData(prev.pairs, []);
        this.pairArrayView = null;
    }

    constructor(indices: number[]) {
        super();
        this.indices = [...indices];
    }
}
