import { character } from "../../types";

function comparator<TKey extends character>(first: TKey, second: TKey) {
	if(first == null){
		return 1;
	}
	if(second == null){
		return -1;
	}
    if (typeof first == "number" && typeof second == "number") {
        return first - second;
    }
    if (typeof first == "string" && typeof second == "string") {
        return first.charCodeAt(0) - second.charCodeAt(0);
    }
    return 0;
}

export default function stableSort<TValue, TKey extends character>(
    elements: TValue[],
    key: (t: TValue) => TKey
): TValue[] {
    const buckets: Map<TKey, TValue[]> = new Map();

    for (const item of elements) {
        if (!buckets.has(key(item))) {
            buckets.set(key(item), []);
        }

        buckets.get(key(item)).push(item);
    }

    return [...buckets.entries()]
        .sort((a, b) => comparator(a[0], b[0]))
        .map((pair) => pair[1])
        .flat();
}
