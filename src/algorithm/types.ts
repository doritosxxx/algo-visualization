import { Edge } from "./class";

export type character = number | string;
export type word<T extends character> = T[];
export type color = "odd" | "even";
export type dualEdge<T extends character> = {
    target: Edge<T>;
    edge: Edge<T>;
};

