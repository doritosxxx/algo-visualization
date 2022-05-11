import ICloneable from "../interface/ICloneable";
import IShallowCloneable from "../interface/IShallowCloneable";
import { character, color } from "../types";

let edge_id = 0;

function getEdgeId() {
    return edge_id++;
}

// Ребро сжатого суффиксного дерева.
// Содержит массив исходящих ребер.
// Ребра упорядочены по первому символу.
export default class Edge<T extends character> implements ICloneable<Edge<T>>, IShallowCloneable<Edge<T>> {
    public children: Edge<T>[] = [];
    public label: T[];
    public type: color | null = null;

    public id: number;

    public constructor(label: T[]) {
        this.id = getEdgeId();
        this.label = label;
    }

    clone(saveId = true): Edge<T> {
        const clone = this.cloneShallow(saveId);
        clone.children = this.children.map((child) => child.clone(saveId));
        clone["dual"] = this["dual"];
        return clone;
    }

    cloneShallow(saveId = true): Edge<T> {
        const clone = new Edge<T>([...this.label]);
        if (saveId) {
            clone.id = this.id;
        }
        clone.type = this.type;
        return clone;
    }

    /**
     * Clones edge type and constructor data.
     * @returns Cloned edge object
     */
    cloneType(): Edge<T> {
        return new Edge<T>([...this.label]);
    }

    public setSubtreeColor(type: color | null) {
        this.type = type;
        for (const child of this.children) {
            child.setSubtreeColor(type);
        }
    }
}
