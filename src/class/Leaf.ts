import { Edge } from ".";
import { character } from "../types";

export default class Leaf<T extends character> extends Edge<T> {
    public suffixIndex: number;

    public constructor(letters: T[], suffixIndex: number) {
        super(letters);
        this.suffixIndex = suffixIndex;
    }
}
