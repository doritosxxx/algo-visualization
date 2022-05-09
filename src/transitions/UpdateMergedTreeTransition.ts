import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import UpdateTreeTransition from "./UpdateTreeTransition";

export default class UpdateMergedTreeTransition extends UpdateTreeTransition {
    description: string = "UpdateMergedTree";

    constructor(tree: Root<character>) {
        super(tree, "merged");
    }
}
