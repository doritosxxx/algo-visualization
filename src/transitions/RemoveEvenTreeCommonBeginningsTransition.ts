import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import UpdateTreeTransition from "./UpdateTreeTransition";

export default class RemoveEvenTreeCommonBeginningsTransition extends UpdateTreeTransition {
    description: string =
        "Восстанавливаем свойства сжатого суффиксного дерева. Выносим общий префикс детей одной вершины в отдельное ребро";

    constructor(tree: Root<character>) {
        super(tree, "even");
    }
}
