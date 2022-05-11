import { Root } from "../algorithm/class";
import { character } from "../algorithm/types";
import UpdateMergedTreeTransition from "./UpdateMergedTreeTransition";

export default class SplitDualEdgeTransition extends UpdateMergedTreeTransition {
    description: string = "TODO";

    private setDescription(
        oldLabel1: string,
        oldLabel2: string,
        commonPrefix: string,
        oddPrefix: string,
        evenPrefix: string
    ) {
        this.description = `Из двойного ребра со строками "${oldLabel1}" и "${oldLabel2}" общий префикс "${commonPrefix}" выносится в отдельное ребро. К новой вершине подвешиваются ребра "${evenPrefix}" и "${oddPrefix}"`;
    }

    constructor(
        tree: Root<character>,
        oldLabel1: string,
        oldLabel2: string,
        commonPrefix: string,
        oddPrefix: string,
        evenPrefix: string
    ) {
        super(tree);
        this.setDescription(oldLabel1, oldLabel2, commonPrefix, oddPrefix, evenPrefix);
    }
}
