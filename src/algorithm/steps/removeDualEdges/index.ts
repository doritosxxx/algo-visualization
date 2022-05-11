import { addTransition } from "../../../controller";
import HideOddEvenTreesTransition from "../../../transitions/HideOddEvenTreesTransition";
import { Root } from "../../class";
import { character, dualEdge } from "../../types";

export default function removeDualEdges<T extends character>(merged: Root<T>, dualEdges: dualEdge<T>[]): Root<T> {
    addTransition(new HideOddEvenTreesTransition());
}
