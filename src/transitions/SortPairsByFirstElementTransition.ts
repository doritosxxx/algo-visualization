import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { SortPairsBySecondElementTransition, TransitionBase } from ".";
import * as state from "../state";

export default class SortPairsByFirstElementTransition extends TransitionBase {
	description: string = "Сортируем пары по первому элементу стабильной сортировкой";
    pairs: Pair<character>[];

    _introduce() {
        // Highlight with red font color.
        state.get().pairArrayView.hideSecondElement();
        state.get().pairArrayView.highlightFirstElement();

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
        const prev = this.previous as SortPairsBySecondElementTransition;

        state.get().pairArrayView.highlightSecondElement();
        state.get().pairArrayView.hideFirstElement();

        prev.updateView();
    }

    constructor(sortedPairs: Pair<character>[]) {
        super();
        this.pairs = [...sortedPairs];
    }
}
