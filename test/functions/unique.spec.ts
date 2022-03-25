import IComparable from "../../src/algorithm/interface/IComparable";
import unique from "../../src/algorithm/functions/unique";
import Pair from "../../src/algorithm/class/Pair";

function areEqual<T extends IComparable<T>>(first: T[], second: T[]): boolean {
    return first.length == second.length && first.every((pair, index) => pair.equals(second[index]));
}

class NumberWrapper implements IComparable<NumberWrapper> {
    public constructor(readonly data: number) {}

    equals(other: NumberWrapper): boolean {
        return this.data == other.data;
    }
}

test("Shouldn't change original array", () => {
    const array: NumberWrapper[] = [new NumberWrapper(1), new NumberWrapper(1)];
    unique(array);
    expect(areEqual(array, [new NumberWrapper(1), new NumberWrapper(1)])).toBe(true);
});

test("Zero length", () => {
    const array: NumberWrapper[] = [];

    expect(areEqual(unique(array), [])).toBe(true);
});

test("One-length", () => {
    const array: NumberWrapper[] = [new NumberWrapper(1)];

    expect(areEqual(unique(array), [new NumberWrapper(1)])).toBe(true);
});

test("Without changes", () => {
    const numbers = [1, 2, 3];
    const array: NumberWrapper[] = numbers.map((n) => new NumberWrapper(n));

    expect(
        areEqual(
            unique(array),
            numbers.map((n) => new NumberWrapper(n))
        )
    ).toBe(true);
});

test("All same", () => {
    const numbers = [1, 1, 1, 1, 1, 1];
    const array: NumberWrapper[] = numbers.map((n) => new NumberWrapper(n));

    expect(areEqual(unique(array), [new NumberWrapper(1)])).toBe(true);
});

test("Complex case", () => {
    const numbers = [1, 1, 2, 3, 7, 9, 9];
    const array: NumberWrapper[] = numbers.map((n) => new NumberWrapper(n));

    const result = [1, 2, 3, 7, 9].map((n) => new NumberWrapper(n));
    expect(areEqual(unique(array), result)).toBe(true);
});

test("pairs", () => {
    const pairs: Pair<number>[] = [
        new Pair(1, 2),
        new Pair(2, 2),
        new Pair(2, 2),
        new Pair(2, 3),
    ];

    const result = [
        new Pair(1, 2),
        new Pair(2, 2),
        new Pair(2, 3),
    ];
    expect(areEqual(unique(pairs), result)).toBe(true);
});
