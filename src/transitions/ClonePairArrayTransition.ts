import * as d3 from "d3";
import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";
import PairArrayView from "../objects/PairArrayView";
import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class ClonePairArrayTransition extends TransitionBase {
	description: string = "Создаем копию массива пар для работы с ней";
    public readonly pairs: Pair<character>[];

    // Previous: SplitIntoPairsTransition
    _introduce() {
        const arrayView = new PairArrayView();
        state.get().pairArrayViewClone = arrayView;
        arrayView.setPairs(this.pairs);

        const container = arrayView.container
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
        state.get().pairArrayViewClone.container.remove();
    }

    constructor(pairs: Pair<character>[]) {
        super();
        this.pairs = [...pairs];
    }
}
