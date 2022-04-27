import { Pair } from "../algorithm/class";
import { character } from "../algorithm/types";

export function flatPairArray(pairs: Pair<character>[]): string[] {
    return pairs.flatMap((p) => [p.first, p.second]).map((e) => (e == null ? "$" : e + ""));
}
