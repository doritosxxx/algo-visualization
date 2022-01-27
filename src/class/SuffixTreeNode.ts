import { character } from "../types";
import SuffixTreeEdge from "./SuffixTreeEdge";

// Сжатое суффиксное дерево.
// Узлы содержат массив ребер.
// Ребра упорядочены по первому символу.
export default class SuffixTreeNode<T extends character> {
    public readonly edges: SuffixTreeEdge<T>[] = [];

	// Функция для облегчения отладки.
    public toString(): string {
		return this.getStringView(0);
	}

	private getStringView(depth : number) : string {
		let result = "";

		for(const edge of this.edges){
			result += "\t".repeat(depth) + edge.substring + '\n' + edge.endNode.getStringView(depth+1);
		}

		return result;
	}
}
