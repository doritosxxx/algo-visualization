import IComparable from "../interface/IComparable";

// Works only for sorted array.
export default function unique<T extends IComparable<T>>(array: T[]): T[] {
    if (array.length == 0) {
        return [];
    }

    const result: T[] = [array[0]];

    for (let i = 1; i < array.length; i++) {
        if (!array[i - 1].equals(array[i])) {
            result.push(array[i]);
        }
    }

	return result;
}
