import { Edge } from ".";
import { character } from "../types";

export default class Leaf<T extends character> extends Edge<T> {
    public suffixIndex: number;

    public constructor(label: T[], suffixIndex: number) {
        super(label);
        this.suffixIndex = suffixIndex;
    }

    clone(): Leaf<T> {
        const clone = new Leaf<T>([...this.label], this.suffixIndex);
        clone.id = this.id;
        clone.type = this.type;
        return clone;
    }
}
