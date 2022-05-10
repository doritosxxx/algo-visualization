import { Root } from "../algorithm/class";
import { character, color } from "../algorithm/types";
import UpdateTreeTransition from "./UpdateTreeTransition";

export default class SplitEdgeTransition extends UpdateTreeTransition {
    description: string;

    private setDescription(old: string, new1: string, new2: string) {
        this.description = `Разделяем ребро "${old}" в ${
            this.name == "even" ? "четном" : "нечетном"
			} дереве на ребра "${new1}" и "${new2}"`;
		}

    constructor(tree: Root<character>, type: color, label: string, newLength: number) {
        super(tree, type);
        this.setDescription(label, label.slice(0, newLength), label.slice(newLength));
    }
}
