import PairArrayView from "./objects/PairArrayView";
import StackView from "./objects/StackView";
import StatusbarView from "./objects/StatusbarView";
import TreeView from "./objects/TreeView";

interface IState {
    stack: StackView;
    statusbar: StatusbarView;
    pairArrayView: PairArrayView;
    pairArrayViewClone: PairArrayView;
    evenTreeView: TreeView;
    oddTreeView: TreeView;
    mergedTreeView: TreeView;
}

let state: IState = null;
const stack = new StackView();
const statusbar = new StatusbarView();

export function reset() {
    state = {
        stack: stack,
        statusbar: statusbar,

        pairArrayView: null,
        pairArrayViewClone: null,

        evenTreeView: null,
        oddTreeView: null,
        mergedTreeView: null,
    };
    state.stack.clear();
}

export function get(): IState {
    return state;
}
