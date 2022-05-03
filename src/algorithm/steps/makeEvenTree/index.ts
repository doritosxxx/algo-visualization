import { addTransition } from "../../../controller";
import ExtractArrayFromStackTransition from "../../../transitions/ExtractArrayFromStackTransition";
import { Root } from "../../class";
import { character } from "../../types";

export default function makeEvenTree<T extends character>(tree: Root<T>) {
    addTransition(new ExtractArrayFromStackTransition());
}
