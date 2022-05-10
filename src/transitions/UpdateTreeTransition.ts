import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import TransitionBase from "./TransitionBase";
import * as state from "../state";
import TreeView from "../views/TreeView";

type TreeName = "odd" | "even" | "merged";

// Extremely simple transition.
// Replaces tree data and runs default animation.
export default abstract class UpdateTreeTransition extends TransitionBase {
    protected name: TreeName;
    public tree: Root<character>;
    public previousTree: Root<character>;

    constructor(tree: Root<character>, name: TreeName) {
        super();
        this.name = name;
        this.tree = tree.clone();
    }

    private getTreeView(): TreeView {
        if (this.name == "even") {
            return state.get().evenTreeView;
        }
        if (this.name == "odd") {
            return state.get().oddTreeView;
        }
        if (this.name == "merged") {
            return state.get().mergedTreeView;
        }
        return null;
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
