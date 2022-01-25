import { character } from "../types";
import SuffixTreeEdge from "./SuffixTreeEdge";

// Сжатое суффиксное дерево.
// Узлы содержат массив ребер.
// Ребра упорядочены по первому символу.
export default class SuffixTreeNode<T extends character> {
	public readonly edges : SuffixTreeEdge<T>[]
}
