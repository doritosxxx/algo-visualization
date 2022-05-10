import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import UpdateTreeTransition from "./UpdateTreeTransition";

export default abstract class UpdateMergedTreeTransition extends UpdateTreeTransition {
    constructor(tree: Root<character>) {
        super(tree, "merged");
    }
}
