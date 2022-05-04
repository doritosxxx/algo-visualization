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
    if (state !== null) {
        stack.clear();
        statusbar.clear();
        state.pairArrayView?.container.remove();
        state.pairArrayViewClone?.container.remove();

        state.evenTreeView?.container.remove();
        state.oddTreeView?.container.remove();
        state.mergedTreeView?.container.remove();
    }

    state = {
        stack: stack,
        statusbar: statusbar,

        pairArrayView: null,
        pairArrayViewClone: null,

        evenTreeView: null,
        oddTreeView: null,
        mergedTreeView: null,
    };
}

export function get(): IState {
    return state;
}
