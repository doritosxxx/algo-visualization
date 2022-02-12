import { character, word } from "../types";

// Ребро сжатого суффиксного дерева.
// Узлы содержат массив ребер.
// Ребра упорядочены по первому символу.
export default class Edge<T extends character> {
    public edges: Edge<T>[] = [];
    public letters: word<T>;
    public readonly type: "odd" | "even" | null = null;

    public constructor(letters: T[]) {
        this.letters = letters;
    }

    public toString(): string {
        return this.getStringView(0);
    }

    private getStringView(depth: number): string {
        return this.edges
            .map((edge) => "\t".repeat(depth) + edge.letters.join("") + "\n" + edge.getStringView(depth + 1))
            .join("");
    }
}
