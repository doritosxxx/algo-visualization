import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class ExtractArrayFromStackTransition extends TransitionBase {
	description: string = "Извлекаем верхний массив пар из стека";
    _introduce() {
		state.get().stack.ejectTop();
	}

    _revoke() {
        state.get().stack.shoveTop();
    }
}
