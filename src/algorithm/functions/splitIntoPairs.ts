import Pair from "../class/Pair";
import { character } from "../types";

// Превращает строку в массив пар символов.
// "abcae" -> [("a","b"), ("c", "a"), ("e", null)]
export default function splitIntoPairs<T extends character>(input: T[]): Pair<T>[] {
    const pairs: Pair<T>[] = [];

    for (let i = 0; i < input.length; i += 2) {
        let pair: Pair<T> = null;

        if (i + 1 == input.length) {
            pair = new Pair<T>(input[i], null);
        } else {
            pair = new Pair<T>(input[i], input[i + 1]);
        }

        pairs.push(pair);
    }

    return pairs;
}
