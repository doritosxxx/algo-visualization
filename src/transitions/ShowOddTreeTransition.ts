import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import TreeView from "../views/TreeView";
import TransitionBase from "./TransitionBase";
import * as state from "../state";

export default class ShowOddTreeTransition extends TransitionBase {
    description: string = "??? Нечетное дерево ???";

    public tree: Root<character>;

    constructor(tree: Root<character>) {
        super();
        this.tree = tree.clone();
    }

    _introduce() {
        const treeView = new TreeView();
        state.get().oddTreeView = treeView;
        const svg = document.querySelector("#svg") as SVGSVGElement;
        svg.appendChild(treeView.container.node());

        const height = state.get().svg.height;
        console.log(state.get().svg);
        state.get().svg.centerBoundBox(0, 0, 2 * 400, height);

        treeView.setSize(400, +height);
        treeView.setData(this.tree);
        treeView.container.attr("x", 400);
    }

    _revoke() {
        state.get().oddTreeView.container.remove();
        state.get().oddTreeView = null;
        state.get().svg.centerBoundBox(0, 0, 400, state.get().svg.height);
    }
}
