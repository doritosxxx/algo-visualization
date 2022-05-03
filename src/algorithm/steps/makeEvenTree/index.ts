import { addTransition } from "../../../controller";
import ExtractArrayFromStackTransition from "../../../transitions/ExtractArrayFromStackTransition";
import UpdateTreeTransition from "../../../transitions/UpdateTreeTransition";
import { Pair, Root } from "../../class";
import { character } from "../../types";
import multiplyLeafIndices from "./multiplyLeafIndices";
import unfold from "./unfold";

export default function makeEvenTree<T extends character>(tree: Root<number>, pairs: Pair<T>[]): Root<T> {
    // TODO:
    addTransition(new ExtractArrayFromStackTransition());

    const unfolded = unfold(tree, pairs);
    addTransition(new UpdateTreeTransition(unfolded));
    multiplyLeafIndices(unfolded);
    addTransition(new UpdateTreeTransition(unfolded));
    
}
