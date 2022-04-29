import * as d3 from "d3";
import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import TransitionBase from "./TransitionBase";

export default class ClonePairArrayTransition extends TransitionBase {
    public clonedPairArrayView: PairArrayView;
    public readonly pairs: Pair<character>[];

    // Previous: SplitIntoPairsTransition
    _introduce() {
        this.clonedPairArrayView = new PairArrayView();
        this.clonedPairArrayView.setPairs(this.pairs);

        const container = this.clonedPairArrayView.container
            .style("position", "relative")
            .style("left", "0")
            .style("top", "-1em")
            .style("transition", "all var(--frame-length)");

        d3.select(".board .layout-vertical-stack").append(() => container.node());
        setTimeout(function () {
            container.style("top", "0").style("margin-top", "4em");
        }, 0);
    }

    _revoke() {
        this.clonedPairArrayView.container.remove();
        this.clonedPairArrayView = null;
    }

    constructor(pairs: Pair<character>[]) {
        super();
        this.pairs = [...pairs];
    }
}
