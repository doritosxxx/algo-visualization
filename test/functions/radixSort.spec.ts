import Pair from "../../src/algorithm/class/Pair";
import radixSort from "../../src/algorithm/functions/radixSort";
import IComparable from "../../src/algorithm/interface/IComparable";
import { character } from "../../src/algorithm/types";

function areEqual<T extends IComparable<T>>(first: T[], second: T[]): boolean {
    return first.length == second.length && first.every((pair, index) => pair.equals(second[index]));
}

function benchmarkSort<T extends character>(array: Pair<T>[]): Pair<T>[] {
    return array.sort((p1, p2) => {
        if (p1.first < p2.first) {
            return -1;
        }
        if (p1.first > p2.first) {
            return 1;
        }

        if (p1.second == null) {
            return 1;
        }
        if (p2.second == null) {
            return -1;
        }

        if (p1.second < p2.second) {
            return -1;
        }
        if (p1.second > p2.second) {
            return 1;
        }

        return 0;
    });
}

function expectArrayEquality<T extends character>(array: Pair<T>[]): jest.JestMatchers<boolean> {
    const sorted = radixSort([...array]);
    const benchmark = benchmarkSort([...array]);

    return expect(areEqual(sorted, benchmark));
}

test("Shouldn't change original array", () => {
    const array: Pair<number>[] = [
        new Pair(1, 1),
        new Pair(0, 3),
        new Pair(4, 3),
        new Pair(9, 1),
        new Pair(3, 2),
        new Pair(8, 0),
        new Pair(5, 1),
        new Pair(5, 4),
        new Pair(9, 9),
        new Pair(9, 9),
    ];

	const result = [...array];
	radixSort(array);

    expect(areEqual(array,result)).toBe(true);
});

test("Single element sort", () => {
    const array: Pair<number>[] = [new Pair(1, 2)];

    expectArrayEquality(array).toBe(true);
});

test("Empty array sort", () => {
    const array: Pair<number>[] = [];

    expectArrayEquality(array).toBe(true);
});

test("Two-element sort", () => {
    const array: Pair<number>[] = [new Pair(3, 4), new Pair(1, 2)];

    expectArrayEquality(array).toBe(true);
});

test("Order by second radix", () => {
    const array: Pair<number>[] = [new Pair(1, 4), new Pair(1, 2), new Pair(1, 1)];

    expectArrayEquality(array).toBe(true);
});

test("Mixed order", () => {
    const array: Pair<number>[] = [
        new Pair(1, 4),
        new Pair(4, 1),
        new Pair(1, 2),
        new Pair(2, 1),
    ];

    expectArrayEquality(array).toBe(true);
});

test("Null element", () => {
    const array: Pair<number>[] = [new Pair(1, 2), new Pair(2, null)];

    expectArrayEquality(array).toBe(true);
});

test("String array", () => {
    const array: Pair<string>[] = [new Pair("b", "a"), new Pair("a", "b")];

    expectArrayEquality(array).toBe(true);
});

test("String mixed order array", () => {
    const array: Pair<string>[] = [
        new Pair("b", "a"),
        new Pair("a", "c"),
        new Pair("a", "b"),
    ];

    expectArrayEquality(array).toBe(true);
});

test("String null element", () => {
    const array: Pair<string>[] = [new Pair("z", "b"), new Pair("a", null)];

    expectArrayEquality(array).toBe(true);
});

test("Greater than 9 number test", () => {
    const array: Pair<number>[] = [new Pair(900, 1), new Pair(1, 90)];

    expectArrayEquality(array).toBe(true);
});

test("Big number test", () => {
    const array: Pair<number>[] = [
        new Pair(1, 1),
        new Pair(0, 3),
        new Pair(4, 3),
        new Pair(9, 1),
        new Pair(3, 2),
        new Pair(8, 0),
        new Pair(5, 1),
        new Pair(5, 4),
        new Pair(9, 9),
        new Pair(9, 9),
    ];

    expectArrayEquality(array).toBe(true);
});
