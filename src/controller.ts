import { reducer } from "./test/reducer";
import TransitionBase from "./transitions/TransitionBase";
import ViewState from "./ViewState";

let isVisualizing = false;

// Frame interval in milliseconds.
let frameInterval = 500;
let interval = null;

let state: ViewState = null;

let transitions: TransitionBase[] = [];
let introduced = 0;

export function restart(string: string) {
    state = new ViewState([]);
    transitions = [];

    reducer();
}

export function addTransition(transition: TransitionBase) {
    transitions.push(transition);

    window.dispatchEvent(
        new CustomEvent("transitionAmountChanged", {
            detail: {
                value: transitions.length,
            },
        })
    );
}

export function moveNext() {
    if (introduced >= transitions.length) {
        return;
    }

    transitions[introduced].introduce(state);
    introduced++;

    window.dispatchEvent(
        new CustomEvent("transitionIndexChanged", {
            detail: {
                value: introduced,
            },
        })
    );
}

export function movePrev() {
    if (introduced == 0) {
        return;
    }
    transitions[introduced - 1].revoke(state);
    introduced--;

    window.dispatchEvent(
        new CustomEvent("transitionIndexChanged", {
            detail: {
                value: introduced,
            },
        })
    );
}
