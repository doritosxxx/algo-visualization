import IndexedPair from "../../src/class/IndexedPair";
import radixSort from "../../src/functions/radixSort";
import IComparable from "../../src/interface/IComparable";
import { character } from "../../src/types";

function areEqual<T extends IComparable<T>>(first: T[], second: T[]): boolean {
    return first.length == second.length && first.every((pair, index) => pair.equals(second[index]));
}

function benchmarkSort<T extends character>(array: IndexedPair<T>[]): IndexedPair<T>[] {
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

function expectArrayEquality<T extends character>(array: IndexedPair<T>[]): jest.JestMatchers<boolean> {
    const sorted = radixSort([...array]);
    const benchmark = benchmarkSort([...array]);

    return expect(areEqual(sorted, benchmark));
}

test("Shouldn't change original array", () => {
    const array: IndexedPair<number>[] = [
        new IndexedPair(1, 1),
        new IndexedPair(0, 3),
        new IndexedPair(4, 3),
        new IndexedPair(9, 1),
        new IndexedPair(3, 2),
        new IndexedPair(8, 0),
        new IndexedPair(5, 1),
        new IndexedPair(5, 4),
        new IndexedPair(9, 9),
        new IndexedPair(9, 9),
    ];

	const result = [...array];
	radixSort(array);

    expect(areEqual(array,result)).toBe(true);
});

test("Single element sort", () => {
    const array: IndexedPair<number>[] = [new IndexedPair(1, 2)];

    expectArrayEquality(array).toBe(true);
});

test("Empty array sort", () => {
    const array: IndexedPair<number>[] = [];

    expectArrayEquality(array).toBe(true);
});

test("Two-element sort", () => {
    const array: IndexedPair<number>[] = [new IndexedPair(3, 4), new IndexedPair(1, 2)];

    expectArrayEquality(array).toBe(true);
});

test("Order by second radix", () => {
    const array: IndexedPair<number>[] = [new IndexedPair(1, 4), new IndexedPair(1, 2), new IndexedPair(1, 1)];

    expectArrayEquality(array).toBe(true);
});

test("Mixed order", () => {
    const array: IndexedPair<number>[] = [
        new IndexedPair(1, 4),
        new IndexedPair(4, 1),
        new IndexedPair(1, 2),
        new IndexedPair(2, 1),
    ];

    expectArrayEquality(array).toBe(true);
});

test("Null element", () => {
    const array: IndexedPair<number>[] = [new IndexedPair(1, 2), new IndexedPair(2, null)];

    expectArrayEquality(array).toBe(true);
});

test("String array", () => {
    const array: IndexedPair<string>[] = [new IndexedPair("b", "a"), new IndexedPair("a", "b")];

    expectArrayEquality(array).toBe(true);
});

test("String mixed order array", () => {
    const array: IndexedPair<string>[] = [
        new IndexedPair("b", "a"),
        new IndexedPair("a", "c"),
        new IndexedPair("a", "b"),
    ];

    expectArrayEquality(array).toBe(true);
});

test("String null element", () => {
    const array: IndexedPair<string>[] = [new IndexedPair("z", "b"), new IndexedPair("a", null)];

    expectArrayEquality(array).toBe(true);
});

test("Greater than 9 number test", () => {
    const array: IndexedPair<number>[] = [new IndexedPair(900, 1), new IndexedPair(1, 90)];

    expectArrayEquality(array).toBe(true);
});

test("Big number test", () => {
    const array: IndexedPair<number>[] = [
        new IndexedPair(1, 1),
        new IndexedPair(0, 3),
        new IndexedPair(4, 3),
        new IndexedPair(9, 1),
        new IndexedPair(3, 2),
        new IndexedPair(8, 0),
        new IndexedPair(5, 1),
        new IndexedPair(5, 4),
        new IndexedPair(9, 9),
        new IndexedPair(9, 9),
    ];

    expectArrayEquality(array).toBe(true);
});
