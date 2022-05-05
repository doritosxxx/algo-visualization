import PairArrayView from "../views/PairArrayView";
import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class PushArrayToStackTransition extends TransitionBase {
	description: string = "Сохраняем первый массив пар в стеке. Позже он понадобится для распаковки строки";
    private pushedPairArrayView: PairArrayView;
    private parentElement: Element;

    _introduce() {
        this.pushedPairArrayView = state.get().pairArrayView;
        state.get().pairArrayView = null;

        this.parentElement = this.pushedPairArrayView.container.node().parentElement;
        state.get().stack.push(this.pushedPairArrayView);
    }

    _revoke() {
        state.get().stack.pop();
        state.get().pairArrayView = this.pushedPairArrayView;

        this.parentElement.insertBefore(this.pushedPairArrayView.container.node(), this.parentElement.firstChild);

        this.pushedPairArrayView = null;
    }

    private removedPairArrayView: PairArrayView;
    private removedPairArrayViewParent: Element;

    _leave(): void {
        this.removedPairArrayView = state.get().pairArrayViewClone;
        state.get().pairArrayViewClone = null;
        this.removedPairArrayViewParent = this.removedPairArrayView.container.node().parentElement;
        this.removedPairArrayView.container.remove();
    }

    _rollback(): void {
        state.get().pairArrayViewClone = this.removedPairArrayView;
        this.removedPairArrayViewParent.appendChild(this.removedPairArrayView.container.node());
        this.removedPairArrayViewParent = null;
        this.removedPairArrayView = null;
    }
}
