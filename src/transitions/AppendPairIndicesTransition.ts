import { RemoveRepeatingPairsTransition, TransitionBase } from "./";
import * as state from "../state";

export default class AppendPairIndicesTransition extends TransitionBase {
	description: string = "Дописываем к каждой паре ее порядковый номер";
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
