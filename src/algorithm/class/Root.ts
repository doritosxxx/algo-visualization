import { Edge } from ".";
import { character } from "../types";

// Shortcut for `new Edge<T>([])`
export default class Root<T extends character> extends Edge<T> {
    public constructor() {
        super([]);
    }

    clone(): Root<T> {
        const clone = this.cloneShallow();
        clone.children = this.children.map((child) => child.clone());
        return clone;
    }

    cloneShallow(): Root<T> {
        const clone = new Root<T>();
        clone.id = this.id;
        clone.type = this.type;
        return clone;
    }

    cloneType(): Root<T> {
        return new Root<T>();
    }
}
