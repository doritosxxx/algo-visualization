import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import { HighlightRepeatingPairsTransition, TransitionBase } from ".";
import * as state from "../state";

export default class RemoveRepeatingPairsTransition extends TransitionBase {
	description: string = "Удаляем найденные повторяющиеся пары";
    public readonly pairs: Pair<character>[];
    public indices: number[];

    _introduce() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        this.indices = prev.indices;

        state.get().pairArrayView.hideFirstElement();
        this.updateView();
    }

    updateView() {
        state.get().pairArrayView.remove(this.indices);
    }

    _revoke() {
        const prev = this.previous as HighlightRepeatingPairsTransition;
        state.get().pairArrayView.setPairs(prev.pairs);
        state.get().pairArrayView.highlightPairsWithBorder(prev.indices);
    }

	_leave(): void {
		// Ensure that all temporary elements are removed even if animation hasn't been ended yet. 
		state.get().pairArrayView.container.selectAll(".removeable").remove();
	}

    constructor(unique: Pair<character>[]) {
        super();
        this.pairs = [...unique];
    }
}
