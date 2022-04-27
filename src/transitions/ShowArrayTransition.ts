import * as d3 from "d3";
import { character } from "../algorithm/types";
import ArrayView from "../objects/ArrayView";
import TransitionBase from "./TransitionBase";

export default class ShowArrayTransition extends TransitionBase {
    public arrayView: ArrayView;
    public readonly word: character[];

	// Previous: RootTransition
    _introduce() {
        this.arrayView = new ArrayView();
        d3.select(".board .layout-centered").append(() => this.arrayView.selection.node());

        this.arrayView.data(this.word.map(String)).join(
            (enter) => enter.append("div").text((d) => d),
            (update) => update.text((d) => d),
            (exit) => exit.remove()
        );
    }

    _revoke() {
        this.arrayView.selection.remove();
    }

    public constructor(word: character[]) {
        super();
        this.word = [...word];
    }
}
