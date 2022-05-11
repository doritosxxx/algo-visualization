import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import UpdateMergedTreeTransition from "./UpdateMergedTreeTransition";

export default class RemoveDualEdgeTransition extends UpdateMergedTreeTransition {
    description: string;

    private setDescripton(evenLabel, oddLabel) {
        this.description = `Строки ${evenLabel} и ${oddLabel} в двойном ребре совпадают. Удаляем одно из ребер.`;
    }

    constructor(tree: Root<character>, evenLabel: string, oddLabel: string) {
        super(tree);
        this.setDescripton(evenLabel, oddLabel);
    }

}
