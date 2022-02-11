import { Edge } from "../class";
import { character } from "../types";

export default interface IEdgeContainer<T extends character> {
	edges: Edge<T>[] ;
}
