import { character } from "../types";
import SuffixTreeEdge from "./Edge";

// Сжатое суффиксное дерево.
// Узлы содержат массив ребер.
// Ребра упорядочены по первому символу.
/*
export default class SuffixTreeNode<T extends character> {
    public readonly edges: SuffixTreeEdge<T>[] = [];

    // Функция для облегчения отладки.
    public toString(): string {
        return this.getStringView(0);
    }

    private getStringView(depth: number): string {
        return this.edges
            .map((edge) => "\t".repeat(depth) + edge.substring.join("") + "\n" + edge.endNode.getStringView(depth + 1))
            .join("");
    }
}
*/