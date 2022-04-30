import PairArrayView from "./objects/PairArrayView";
import StackView from "./objects/StackView";

interface IState {
    pairArrayView: PairArrayView;
    pairArrayViewClone: PairArrayView;
    stack: StackView;
}

let state: IState = null;
const stack = new StackView();
console.log(stack)

export function reset() {
    state = {
        pairArrayView: null,
        pairArrayViewClone: null,
        stack: stack,
    };
    state.stack.clear();
}

export function get(): IState {
    return state;
}
