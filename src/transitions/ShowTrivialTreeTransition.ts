import * as state from "../state";
import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import TreeView from "../views/TreeView";
import PairArrayView from "../views/PairArrayView";
import TransitionBase from "./TransitionBase";

export default class ShowTrivialTreeTransition extends TransitionBase {
    description: string = "Для строки длиной 1 суффиксное дерево строится тривиально";
    private hiddenArrayView: PairArrayView;
    private hiddenElementParent: HTMLElement;

    public tree: Root<character>;
    constructor(tree: Root<character>) {
        super();
        this.tree = tree.clone();
    }

    _introduce() {
        const treeView = new TreeView();
        state.get().evenTreeView = treeView;
        const svg = document.querySelector("#svg") as SVGSVGElement;
        svg.appendChild(treeView.container.node());

        const height = state.get().svg.height;
        state.get().svg.centerBoundBox(0, 0, 400, height);

        treeView.setSize(400, +height);
        treeView.setData(this.tree);

        this.hiddenArrayView = state.get().pairArrayView;
        state.get().pairArrayView = null;
        this.hiddenElementParent = this.hiddenArrayView.container.node().parentElement;
        this.hiddenArrayView.container.remove();
    }

    _revoke() {
        state.get().evenTreeView.container.remove();
        state.get().evenTreeView = null;

        state.get().pairArrayView = this.hiddenArrayView;
        this.hiddenElementParent.appendChild(this.hiddenArrayView.container.node());

        this.hiddenElementParent = null;
        this.hiddenArrayView = null;
    }
}
