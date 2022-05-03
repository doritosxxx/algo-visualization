import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import TransitionBase from "./TransitionBase";
import * as state from "../state";

// Extremely simple transition.
// Replaces tree data and runs default animation.
export default class UpdateTreeTransition extends TransitionBase {
    public tree: Root<character>;
	public previousTree: Root<character>;

    constructor(tree: Root<character>) {
        super();
        this.tree = tree.clone();
    }

    _introduce() {
		this.previousTree = state.get().treeView1.tree;
        state.get().treeView1.setData(this.tree);
    }
    _revoke() {
        state.get().treeView1.setData(this.previousTree);
		this.previousTree = null;
    }
}
