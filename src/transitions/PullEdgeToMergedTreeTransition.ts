import UpdateMergedTreeTransition from "./UpdateMergedTreeTransition";
import * as state from "../state";
import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";

export default class PullEdgeToMergedTreeTransition extends UpdateMergedTreeTransition {
    description: string = "[TODO]";

    private edgeId: number;
    private sourceEdgeId: number;

    constructor(tree: Root<character>, edgeId: number, sourceEdgeId: number) {
        super(tree);
        this.edgeId = edgeId;
        this.sourceEdgeId = sourceEdgeId;
    }

    _introduce(): void {
        state.get().mergedTreeView.setEdgePosition(this.edgeId, this.sourceEdgeId);
		super._introduce();
    }
}
