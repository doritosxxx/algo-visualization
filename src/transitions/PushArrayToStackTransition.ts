import PairArrayView from "../objects/PairArrayView";
import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class PushArrayToStackTransition extends TransitionBase {
    private pushedPairArrayView: PairArrayView;
    private nextSibling: Element;
    private parentElement: Element;

    _introduce() {
        this.pushedPairArrayView = state.get().pairArrayView;
        state.get().pairArrayView = null;

        this.nextSibling = this.pushedPairArrayView.container.node().nextElementSibling;
        this.parentElement = this.pushedPairArrayView.container.node().parentElement;
        state.get().stack.push(this.pushedPairArrayView);
    }

    _revoke() {
        state.get().stack.pop();
        state.get().pairArrayView = this.pushedPairArrayView;

		console.log(this.parentElement, this.nextSibling)
        if (this.nextSibling == null) {
            this.parentElement.appendChild(this.pushedPairArrayView.container.node());
        } else {
            this.parentElement.insertBefore(this.pushedPairArrayView.container.node(), this.nextSibling);
        }

        this.pushedPairArrayView = null;
    }
}
