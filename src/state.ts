import PairArrayView from "./views/PairArrayView";
import StackView from "./views/StackView";
import StatusbarView from "./views/StatusbarView";
import SVGView from "./views/SVGView";
import TooltipView from "./views/TooltipView";
import TreeView from "./views/TreeView";

interface IState {
    stack: StackView;
    statusbar: StatusbarView;
    svg: SVGView;
    pairArrayView: PairArrayView;
    pairArrayViewClone: PairArrayView;
    evenTreeView: TreeView;
    oddTreeView: TreeView;
    mergedTreeView: TreeView;
	tooltip: TooltipView;
}

let state: IState = null;
const stack = new StackView();
const statusbar = new StatusbarView();
const svg = new SVGView();
const tooltip = new TooltipView();

export function reset() {
    if (state !== null) {
        stack.clear();
        statusbar.clear();
		tooltip.clear();
        state.pairArrayView?.container.remove();
        state.pairArrayViewClone?.container.remove();

        state.evenTreeView?.container.remove();
        state.oddTreeView?.container.remove();
        state.mergedTreeView?.container.remove();
    }

    state = {
        stack: stack,
        statusbar: statusbar,
        svg: svg,
		tooltip: tooltip,

        pairArrayView: null,
        pairArrayViewClone: null,

        evenTreeView: null,
        oddTreeView: null,
        mergedTreeView: null,
    };

	state.svg.setSize(1000, 600);
}

export function get(): IState {
    return state;
}
