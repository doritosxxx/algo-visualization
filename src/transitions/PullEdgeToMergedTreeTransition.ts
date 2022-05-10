import UpdateMergedTreeTransition from "./UpdateMergedTreeTransition";
import * as state from "../state";
import { Edge, Root } from "../algorithm/class";
import { character } from "../algorithm/types";

export default class PullEdgeToMergedTreeTransition extends UpdateMergedTreeTransition {
    description: string = "[TODO]";

    private edgeId: number;
    private sourceEdgeId: number;
    private dualEdgeId: number;

    private setDescription(first: string, second: string) {
        this.description = `Переносим ребра "${first}" и "${second}" так как их длины равны и первый символ совпадает`;
    }

    constructor(tree: Root<character>, edgeId: number, evenEdge: Edge<character>, oddEdge: Edge<character>) {
        super(tree);
        this.setDescription(evenEdge.label.join(""), oddEdge.label.join(""));
        this.edgeId = edgeId;
        this.sourceEdgeId = evenEdge.id;
        this.dualEdgeId = oddEdge.id;
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
        super._introduce();
        this.emphesizePulledEdges();
    }

    _revoke(): void {
        this.unemphesizePulledEdges();
        super._revoke();
    }
}
