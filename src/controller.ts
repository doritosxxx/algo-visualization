import { makeSuffixTree } from "./algorithm/steps/makeSuffixTree";
import RootTransition from "./transitions/RootTransition";
import TransitionBase from "./transitions/TransitionBase";

let isVisualizing = false;

// Frame interval in milliseconds.
let frameInterval = 500;
let interval = null;

let transitions = 0;
let introduced = 0;
let transitionTail: TransitionBase = new RootTransition();
let transitionHead = transitionTail;

export function restart(string: string) {

    makeSuffixTree(string);
}

export function addTransition(transition: TransitionBase) {
    transitions++;

    transitionTail.append(transition);
    transitionTail = transitionTail.next;

    window.dispatchEvent(
        new CustomEvent("transitionAmountChanged", {
            detail: {
                value: transitions,
            },
        })
    );
}

export function moveNext() {
    if (transitionHead.next == null) {
        return;
    }

    transitionHead = transitionHead.introduceNext();
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
    if (transitionHead.previous == null) {
        return;
    }
    transitionHead.revoke();
    transitionHead = transitionHead.previous;
    introduced--;

    window.dispatchEvent(
        new CustomEvent("transitionIndexChanged", {
            detail: {
                value: introduced,
            },
        })
    );
}
