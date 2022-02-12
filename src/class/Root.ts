import { Edge } from ".";
import { character } from "../types";

// Shortcut for `new Edge<T>([])`
export default class Root<T extends character> extends Edge<T> {
    public edges: Edge<T>[];

    public constructor() {
        super([]);
    }
}
