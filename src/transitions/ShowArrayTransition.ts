import * as d3 from "d3";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import { TransitionBase } from ".";
import { Pair } from "../algorithm/class";

export default class ShowArrayTransition extends TransitionBase {
    public pairArrayView: PairArrayView;
    public readonly pairs: Pair<character>[];

    // Previous: RootTransition
    _introduce() {
        this.pairArrayView = new PairArrayView();
        d3.select(".board .layout-centered").append(() => this.pairArrayView.container.node());

		this.pairArrayView.showAsArray();
        this.pairArrayView.setPairs(this.pairs);
    }

    _revoke() {
        this.pairArrayView.container.remove();
        this.pairArrayView = null;
    }

    public constructor(pairs: Pair<character>[]) {
        super();
        this.pairs = [...pairs];
    }
}
