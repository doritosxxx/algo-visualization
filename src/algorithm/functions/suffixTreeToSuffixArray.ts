import { Edge } from "../class";
import { character } from "../types";
import countLeaves from "./countLeaves";

export default function suffixTreeToSuffixArray<T extends character>(tree: Edge<T>): number[] {
    const array: number[] = Array(countLeaves(tree)).fill(0);

	throw new Error("Not implemented")
}

function fillArray<T extends character>(tree: Edge<T>, array :number[]) {
	
}