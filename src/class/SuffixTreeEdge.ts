import { character } from "../types";
import SuffixTreeNode from "./SuffixTreeNode";

export default class SuffixTreeEdge<T extends character> {
    public substring: T[];
    public readonly type: "odd" | "even" | null = null;
	public endNode : SuffixTreeNode<T> = new SuffixTreeNode<T>();

    public constructor(substring: T[]) {
        this.substring = substring;
    }
}
