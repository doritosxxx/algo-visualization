import PairArrayView from "./objects/PairArrayView";
import StackView from "./objects/StackView";
import TreeView from "./objects/TreeView";

interface IState {
    pairArrayView: PairArrayView;
    pairArrayViewClone: PairArrayView;
    stack: StackView;
    treeView1: TreeView;
}

let state: IState = null;
const stack = new StackView();

export function reset() {
    state = {
        pairArrayView: null,
        pairArrayViewClone: null,
        stack: stack,

        treeView1: null,
    };
    state.stack.clear();
}

export function get(): IState {
    return state;
}
