import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import UpdateTreeTransition from "./UpdateTreeTransition";

export default class UnfoldEvenTreeTransition extends UpdateTreeTransition {
    description: string = "Заменяем каждое число в дереве на символы из пары с соответствующим индексом";

    constructor(tree: Root<character>) {
        super(tree, "even");
    }
}
