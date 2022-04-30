import PairArrayView from "./objects/PairArrayView";

interface IState {
    pairArrayView: PairArrayView;
    pairArrayViewClone: PairArrayView;
}

let state: IState = null;

export function reset() {
    state = {
        pairArrayView: null,
        pairArrayViewClone: null,
    };
}

export function get(): IState {
    return state;
}
