import IndexedPair from "../class/IndexedPair";
import { character } from "../types";

function countSort(
    array: IndexedPair<character>[],
    getRadix: (pair: IndexedPair<character>) => character
): IndexedPair<character>[] {
    const radixes = array.map((pair) => {
        let radix = getRadix(pair);
        if (typeof radix == "string") {
            return radix.charCodeAt(0);
        }
        return radix;
    });
    // All values & null.
    let radixSize = 2 + Math.max(...radixes.filter((radix) => radix !== null));
    for (let i = 0; i < radixes.length; i++) {
        if (radixes[i] === null) {
            radixes[i] = radixSize - 1;
        }
    }

    const sorted: IndexedPair<character>[] = new Array(array.length);
    const count = new Array(radixSize).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[radixes[i]]++;
    }

    let nextIndex = 0;
    for (let i = 0; i < radixSize; i++) {
        const tmp = count[i];
        count[i] = nextIndex;
        nextIndex += tmp;
    }

    for (let i = 0; i < array.length; i++) {
        sorted[count[radixes[i]]] = array[i];
        count[radixes[i]]++;
    }
    return sorted;
}

export default function radixSort(array: IndexedPair<character>[]): IndexedPair<character>[] {
    if (array.length == 0) {
        return [];
    }
    array = countSort(array, (pair) => pair.second);
    array = countSort(array, (pair) => pair.first);
    return array;
}
