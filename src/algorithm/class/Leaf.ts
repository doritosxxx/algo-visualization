import { Edge } from ".";
import { character } from "../types";

export default class Leaf<T extends character> extends Edge<T> {
    public suffixIndex: number;

    public constructor(label: T[], suffixIndex: number) {
        super(label);
        this.suffixIndex = suffixIndex;
    }
}
