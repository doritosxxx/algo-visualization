import { Edge } from ".";
import { character } from "../types";

export default class Leaf<T extends character> extends Edge<T> {
    public suffixIndex: number;

    public constructor(suffixIndex: number) {
        super([]);
        this.suffixIndex = suffixIndex;
    }

    clone(): Leaf<T> {
        return this.cloneShallow();
    }

    cloneShallow(): Leaf<T> {
        const clone = new Leaf<T>(this.suffixIndex);
        clone.id = this.id;
        clone.type = this.type;
        return clone;
    }

    cloneType(): Leaf<T> {
        return new Leaf(this.suffixIndex);
    }
}
