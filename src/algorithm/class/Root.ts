import { Edge } from ".";
import { character } from "../types";

// Shortcut for `new Edge<T>([])`
export default class Root<T extends character> extends Edge<T> {
    public constructor() {
        super([]);
    }

    clone(saveId = true): Root<T> {
        const clone = this.cloneShallow(saveId);
        clone.children = this.children.map((child) => child.clone(saveId));
        return clone;
    }

    cloneShallow(saveId = true): Root<T> {
        const clone = new Root<T>();
        if (saveId) {
            clone.id = this.id;
        }
        clone.type = this.type;
        return clone;
    }

    cloneType(): Root<T> {
        return new Root<T>();
    }
}
