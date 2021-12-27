import IndexedPair from "../class/IndexedPair";
import { character } from "../types";

// Превращает строку в массив пар символов.
// "abcae" -> [("a","b"), ("c", "a"), ("e", null)]
export default function splitIntoPairs<T extends character>(
    input: T[]
): IndexedPair<T>[] {
    const pairs: IndexedPair<T>[] = [];

    for (let i = 0; i < input.length; i += 2) {
        let pair: IndexedPair<T> = null;

        if (i + 1 == input.length) {
            pair = new IndexedPair<T>(input[i], null);
        } else {
            pair = new IndexedPair<T>(input[i], input[i + 1]);
        }

        pairs.push(pair);
    }

    return pairs;
}
