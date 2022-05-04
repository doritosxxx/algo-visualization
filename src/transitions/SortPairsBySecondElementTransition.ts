import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { TransitionBase, SplitIntoPairsTransition } from ".";
import * as state from "../state";

export default class SortPairsBySecondElementTransition extends TransitionBase {
	description: string = "Сортируем пары по второму элементу стабильной сортировкой";
    public readonly pairs: Pair<character>[];

    // Previous: ClonePairArrayTransition
    _introduce() {
        // Highlight with red font color.
        state.get().pairArrayView.highlightSecondElement();
        this.updateView();
    }

    updateView() {
        const pairArrayView = state.get().pairArrayView;
        const prev = pairArrayView.getPairs();
        const order = this.pairs.map((pair) => prev.indexOf(pair));
        pairArrayView.reorder(order);
        pairArrayView.setPairs(this.pairs);
    }

    _revoke() {
        state.get().pairArrayView.hideSecondElement();

        (this.previous.previous as SplitIntoPairsTransition).updateView();
    }

    constructor(sortedPairs: Pair<character>[]) {
        super();
        this.pairs = [...sortedPairs];
    }
}
