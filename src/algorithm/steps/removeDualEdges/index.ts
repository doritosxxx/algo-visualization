import { addTransition } from "../../../controller";
import HideOddEvenTreesTransition from "../../../transitions/HideOddEvenTreesTransition";
import { Root } from "../../class";
import { character } from "../../types";

export default function removeDualEdges<T extends character>(merged: Root<T>) : Root<T>{
	addTransition(new HideOddEvenTreesTransition());
}