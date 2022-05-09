import TransitionBase from "./TransitionBase";
import * as state from "../state";
import TreeView from "../views/TreeView";

export default class ShowMergedTreeTransition extends TransitionBase {
    description: string = "Начинаем слияние деревьев";

    _introduce() {
        const treeView = new TreeView();
        state.get().mergedTreeView = treeView;
        const svg = document.querySelector("#svg") as SVGSVGElement;
        svg.appendChild(treeView.container.node());

        const height = state.get().svg.height;
        state.get().svg.centerBoundBox(0, 0, 3 * 400, height);

        treeView.setSize(400, +height);
        treeView.container.attr("x", 800);
    }

    _revoke() {
        state.get().mergedTreeView.container.remove();
        state.get().mergedTreeView = null;
        state.get().svg.centerBoundBox(0, 0, 800, state.get().svg.height);
    }
}
