import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import TreeView from "../objects/TreeView";
import TransitionBase from "./TransitionBase";
import * as state from "../state";
import ArrayView from "../objects/ArrayView";
import PairArrayView from "../objects/PairArrayView";

export default class ShowTrivialTreeTransition extends TransitionBase {
    private hiddenArrayView: PairArrayView;
    private hiddenElementParent: HTMLElement;

    public tree: Root<character>;
    constructor(tree: Root<character>) {
        super();
        this.tree = tree.clone();
    }

    _introduce() {
        const treeView = new TreeView();
        state.get().treeView1 = treeView;
        const svg = document.querySelector("#svg") as SVGSVGElement;
        svg.appendChild(treeView.container.node());

        const [width, height] = ["width", "height"].map((key) => svg.getAttribute(key));
        const viewBox = (svg.getAttribute("viewBox") ?? `0 0 ${width} ${height}`).split(" ");
        viewBox[0] = (-width / 2 + 400 / 2).toString();
        svg.setAttribute("viewBox", viewBox.join(" "));

        treeView.setSize(400, +height);
        treeView.setData(this.tree);

        console.log(state.get());
        this.hiddenArrayView = state.get().pairArrayView;
        state.get().pairArrayView = null;
        this.hiddenElementParent = this.hiddenArrayView.container.node().parentElement;
        this.hiddenArrayView.container.remove();
    }

    _revoke() {
        state.get().treeView1.container.remove();
        state.get().treeView1 = null;

        state.get().pairArrayView = this.hiddenArrayView;
        this.hiddenElementParent.appendChild(this.hiddenArrayView.container.node());

        this.hiddenElementParent = null;
        this.hiddenArrayView = null;
    }
}
