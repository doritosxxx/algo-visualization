import UpdateMergedTreeTransition from "./UpdateMergedTreeTransition";
import * as state from "../state";
import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";

export default class PullEdgeToMergedTreeTransition extends UpdateMergedTreeTransition {
    description: string = "[TODO]";

    private edgeId: number;
    private sourceEdgeId: number;
    private dualEdgeId: number;

    constructor(tree: Root<character>, edgeId: number, sourceEdgeId: number, dualEdgeId: number) {
        super(tree);
        this.edgeId = edgeId;
        this.sourceEdgeId = sourceEdgeId;
        this.dualEdgeId = dualEdgeId;
    }

    private emphesizePulledEdges() {
        document.querySelector(`.link[data-id="${this.sourceEdgeId}"]`).classList.add("thick");
        document.querySelector(`.link[data-id="${this.dualEdgeId}"]`).classList.add("thick");
    }

    private unemphesizePulledEdges() {
        document.querySelector(`.link[data-id="${this.sourceEdgeId}"]`).classList.remove("thick");
        document.querySelector(`.link[data-id="${this.dualEdgeId}"]`).classList.remove("thick");
    }

    _introduce(): void {
        state.get().mergedTreeView.setEdgePosition(this.edgeId, this.sourceEdgeId);
        super._introduce();
        this.emphesizePulledEdges();
    }

    _revoke(): void {
        this.unemphesizePulledEdges();
        super._revoke();
    }
}
