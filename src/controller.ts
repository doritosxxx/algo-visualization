import { makeSuffixTree } from "./algorithm/steps/makeSuffixTree";
import RootTransition from "./transitions/RootTransition";
import TransitionBase from "./transitions/TransitionBase";
import * as state from "./state";

let animationEnabled = false;

// Frame interval in milliseconds.
let frameLength = 1000;
let intervalId = null;

let transitions = 0;
let introduced = 0;
let transitionTail: TransitionBase = new RootTransition();
let transitionHead: TransitionBase = transitionTail;

export function play() {
    if (animationEnabled) {
        return;
    }

    intervalId = setInterval(function () {
        moveNext();
        if (introduced == transitions) {
            pause();
            return;
        }
    }, frameLength);

    window.dispatchEvent(new CustomEvent("animationStarted"));
}

export function pause() {
    animationEnabled = false;
    clearInterval(intervalId);
    window.dispatchEvent(new CustomEvent("animationPaused"));
}

export function restart(string: string) {
    window.dispatchEvent(new CustomEvent("animationRestarting"));
    pause();
    state.reset();
    transitions = 0;
    introduced = 0;
    transitionTail = transitionHead = new RootTransition();
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
