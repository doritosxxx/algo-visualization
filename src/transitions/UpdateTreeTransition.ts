import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import TransitionBase from "./TransitionBase";
import * as state from "../state";
import TreeView from "../views/TreeView";

type TreeName = "odd" | "even";

// Extremely simple transition.
// Replaces tree data and runs default animation.
export default abstract class UpdateTreeTransition extends TransitionBase {
    private name: TreeName;
    public tree: Root<character>;
    public previousTree: Root<character>;

    constructor(tree: Root<character>, name: TreeName) {
        super();
        this.name = name;
        this.tree = tree.clone();
    }

    private getTreeView(): TreeView {
        const treeView = this.name == "even" ? state.get().evenTreeView : state.get().oddTreeView;
        return treeView;
    }

    _introduce() {
        this.previousTree = this.getTreeView().tree;
        this.getTreeView().setData(this.tree);
    }
    _revoke() {
        this.getTreeView().setData(this.previousTree);
        this.previousTree = null;
    }
}
