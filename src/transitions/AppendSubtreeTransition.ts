import { Root } from "../algorithm/class";
import { character, color } from "../algorithm/types";
import UpdateMergedTreeTransition from "./UpdateMergedTreeTransition";

export default class AppendSubtreeTransition extends UpdateMergedTreeTransition {
    description: string;

    private descendants: number[];

    private setDescription(type: color) {
        this.description = `Переносим несовпадающее поддерево из ${type == "even" ? "четного" : "нечетного"} дерева`;
    }

    constructor(tree: Root<character>, type: color, descendants: number[]) {
        super(tree);
        this.setDescription(type);
        this.descendants = descendants;
    }

    _introduce(): void {
        super._introduce();
        for (const id of this.descendants) {
            document.querySelector(`.link[data-id="${id}"]`).classList.add("thick");
        }
    }

    _revoke(): void {
        for (const id of this.descendants) {
            document.querySelector(`.link[data-id="${id}"]`).classList.remove("thick");
        }
        super._revoke();
    }
}
