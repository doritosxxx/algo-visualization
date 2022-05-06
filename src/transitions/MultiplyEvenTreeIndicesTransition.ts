import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import UpdateTreeTransition from "./UpdateTreeTransition";

export default class MultiplyEvenTreeIndicesTransition extends UpdateTreeTransition {
    description: string = "Умножаем номер каждого суффикса на 2";

    constructor(tree: Root<character>) {
        super(tree, "even");
    }
}
