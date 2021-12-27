import IComparable from "../interface/IComparable";
import { character } from "../types";

export default class IndexedPair<T extends character> implements IComparable<IndexedPair<T>> {
    public constructor(readonly first: T, readonly second: T | null) {}

    equals(other: IndexedPair<T>): boolean {
        return this.first == other.first && this.second == other.second;
    }

    public toString() {
        return `(${this.first},${this.second ?? "$"})`;
    }
}
