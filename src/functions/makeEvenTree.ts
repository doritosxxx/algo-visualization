import IndexedPair from "../class/IndexedPair";
import SuffixTreeNode from "../class/SuffixTreeNode";
import { character } from "../types";

export default function makeEvenTree<T extends character>(tree: SuffixTreeNode<number>, indexes : IndexedPair<T>[]): SuffixTreeNode<T> {
	return new SuffixTreeNode();
}
