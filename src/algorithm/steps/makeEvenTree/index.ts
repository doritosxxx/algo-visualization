import { addTransition } from "../../../controller";
import { ExtractArrayFromStackTransition, MultiplyEvenTreeIndicesTransition, RemoveEvenTreeCommonBeginningsTransition, UnfoldEvenTreeTransition, UpdateTreeTransition } from "../../../transitions";
import { Pair, Root } from "../../class";
import { character } from "../../types";
import fixCommonBeginnings from "./fixCommonBeginnings";
import multiplyLeafIndices from "./multiplyLeafIndices";
import unfold from "./unfold";

export default function makeEvenTree<T extends character>(tree: Root<number>, pairs: Pair<T>[]): Root<T> {
    // TODO:
    //addTransition(new ExtractArrayFromStackTransition());

    const unfolded = unfold(tree, pairs);
    addTransition(new UnfoldEvenTreeTransition(unfolded));
    multiplyLeafIndices(unfolded);
    addTransition(new MultiplyEvenTreeIndicesTransition(unfolded));
    fixCommonBeginnings(unfolded);
    addTransition(new RemoveEvenTreeCommonBeginningsTransition(unfolded));

	return unfolded;
}
