import * as d3 from "d3";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import { TransitionBase } from ".";
import { Pair } from "../algorithm/class";
import * as state from "../state";

export default class ShowArrayTransition extends TransitionBase {
    public readonly pairs: Pair<character>[];

    // Previous: RootTransition
    _introduce() {
        const pairArrayView = new PairArrayView();
        state.get().pairArrayView = pairArrayView;
        d3.select(".board .layout-vertical-stack").append(() => pairArrayView.container.node());

        pairArrayView.showAsArray();
        pairArrayView.setPairs(this.pairs);
    }

    _revoke() {
        state.get().pairArrayView.container.remove();
        state.get().pairArrayView = null;
    }

	_leave(): void {
		state.get().pairArrayView.showAsPairArray();
	}

	_rollback(): void {
		state.get().pairArrayView.showAsArray();
	}

    public constructor(pairs: Pair<character>[]) {
        super();
        this.pairs = [...pairs];
    }
}
