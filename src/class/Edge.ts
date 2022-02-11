import IEdgeContainer from "../interface/IEdgeContainer";
import { character, word } from "../types";

export default class Edge<T extends character> implements IEdgeContainer<T> {
	public edges: Edge<T>[];
    public letters: word<T>; // add list
    public readonly type: "odd" | "even" | null = null;

    public constructor(letters: T[]) {
        this.letters = letters;
    }
	
}
