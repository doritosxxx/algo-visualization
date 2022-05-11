import TransitionBase from "./TransitionBase";
import * as state from "../state";
import PairArrayView from "../views/PairArrayView";

export default class RemoveArrayFromStackTransition extends TransitionBase {
    description: string = "Удаляем массив пар из стека";

    private top: PairArrayView;

    _introduce() {
        this.top = state.get().stack.pop();
    }
    _revoke() {
        state.get().stack.push(this.top);
        this.top = null;
    }
}
