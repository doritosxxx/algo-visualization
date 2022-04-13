import * as d3 from "d3";
import { character } from "../algorithm/types";
import StringView from "../objects/StringView";
import TransitionBase from "./TransitionBase";

export default class ShowStringTransition extends TransitionBase {
    private stringView: StringView;

    _introduce() {
        document.querySelector(".board .layout-centered").appendChild(this.stringView.domElement);
    }
    _revoke() {
        this.stringView.unmount();
    }

    public constructor(word: character[]) {
        super();

        this.stringView = new StringView(word.join(""));
    }
}
