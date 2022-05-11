import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import * as state from "../state";
import UpdateTreeTransition from "./UpdateTreeTransition";

export default class ConvertMergedToSuffixTree extends UpdateTreeTransition {
    description: string = "Убираем цвет у ребер";

    constructor(tree: Root<character>) {
        super(tree, "even");
    }

    _introduce() {
        state.get().evenTreeView = state.get().mergedTreeView;
        state.get().mergedTreeView = null;
        // Update even tree.
        super._introduce();
    }

    _revoke() {
        // Update even tree.
        super._revoke();
        state.get().mergedTreeView = state.get().evenTreeView;
        state.get().evenTreeView = null;
    }
}
