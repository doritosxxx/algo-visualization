import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class ExtractArrayFromStackTransition extends TransitionBase {
    _introduce() {
		state.get().stack.ejectTop();
	}

    _revoke() {
        state.get().stack.shoveTop();
    }
}
